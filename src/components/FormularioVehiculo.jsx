import React, { useState, useEffect } from "react";
import { obtenerTipoCombustibles } from "../services/TipoCombustibleServices";
import { obtenerTipoVehiculo } from "../services/TipoVehiculoServices";
import { obtenerModelos } from "../services/ModelosVehiculosServices";
import { listaEstados } from "../services/EstadoServices";
import {
  obtenerVehiculos,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
  subirImagenes,
  eliminarImagen as apiEliminarImagen, // alias para usar apiEliminarImagen() en tu componente
} from "../services/VehiculoServices";

const MAX_MB = 10;

const FormularioVehiculo = ({
  vehiculoInicial,
  onSubmit,
  obtenerTipoVehiculo: fnObtenerTipoVehiculo = obtenerTipoVehiculo,
  obtenerTipoCombustible: fnObtenerTipoCombustible = obtenerTipoCombustibles,
  obtenerModelos: fnObtenerModelos = obtenerModelos,
  listaEstados: fnObtenerEstados = listaEstados,
}) => {
  const [formData, setFormData] = useState({
    id: undefined,
    descripcion: "",
    noChasis: "",
    noMotor: "",
    noPlaca: "",
    color: "",
    montoPorDia: "",
    tipoCombustibleId: "",
    modeloId: "",
    tipoVehiculoId: "",
    estadoId: "",
    marcaNombre: "",
  });

  const [tiposCombustible, setTiposCombustible] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [tiposVehiculo, setTiposVehiculo] = useState([]);
  const [estados, setEstados] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Imágenes
  const [imagenes, setImagenes] = useState([]); // Files nuevas (para subir)
  const [previews, setPreviews] = useState([]); // [{id, file, preview}]
  const [imagenesExistentes, setImagenesExistentes] = useState([]); // del backend

  // Progreso de subida (0 - 100)
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);

        const [
          tiposVehiculoData,
          tiposCombustibleData,
          modelosData,
          estadosData,
        ] = await Promise.all([
          fnObtenerTipoVehiculo?.() || Promise.resolve([]),
          fnObtenerTipoCombustible?.() || Promise.resolve([]),
          fnObtenerModelos?.() || Promise.resolve([]),
          fnObtenerEstados?.() || Promise.resolve([]),
        ]);

        setTiposVehiculo(tiposVehiculoData);
        setTiposCombustible(tiposCombustibleData);
        setModelos(modelosData);
        setEstados(estadosData);

        if (vehiculoInicial) {
          const marcaDerivada =
            vehiculoInicial.marcaNombre ||
            modelosData.find((m) => m.id === Number(vehiculoInicial.modeloId))
              ?.marcaNombre ||
            "";
          setFormData((prev) => ({
            ...prev,
            ...vehiculoInicial,
            marcaNombre: marcaDerivada,
          }));
          setImagenesExistentes(vehiculoInicial.multimedia || []);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();

    // Limpieza de object URLs al desmontar
    return () => {
      try {
        previews.forEach((p) => p.preview && URL.revokeObjectURL(p.preview));
      } catch (_) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    vehiculoInicial,
    fnObtenerTipoVehiculo,
    fnObtenerTipoCombustible,
    fnObtenerModelos,
    fnObtenerEstados,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "modeloId") {
      const modeloSeleccionado = modelos.find((m) => m.id === Number(value));
      updatedData.marcaNombre = modeloSeleccionado?.marcaNombre || "";
    }

    setFormData(updatedData);
  };

  const handleImagenChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Validaciones: tipo y tamaño
    const validFiles = [];
    const invalids = [];

    files.forEach((file) => {
      const isImage = file.type && file.type.startsWith("image/");
      const withinSize = file.size <= MAX_MB * 1024 * 1024;
      if (isImage && withinSize) validFiles.push(file);
      else invalids.push({ file, reason: !isImage ? "tipo" : "size" });
    });

    if (invalids.length) {
      const hasSize = invalids.some((i) => i.reason === "size");
      const hasType = invalids.some((i) => i.reason === "tipo");
      let msg = "Se omitieron archivos inválidos:";
      if (hasType) msg += " (no son imágenes)";
      if (hasSize) msg += ` (mayores a ${MAX_MB}MB)`;
      alert(msg);
    }

    if (!validFiles.length) return;

    setImagenes((prev) => [...prev, ...validFiles]);

    const nuevos = validFiles.map((file) => ({
      id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }));
    setPreviews((prev) => [...prev, ...nuevos]);
  };

  const eliminarImagenNueva = (index) => {
    const toRemove = previews[index];
    if (toRemove?.preview) URL.revokeObjectURL(toRemove.preview);
    setPreviews((p) => p.filter((_, i) => i !== index));
    setImagenes((imgs) => imgs.filter((_, i) => i !== index));
  };

  const eliminarImagenExistente = async (mediaId) => {
    if (!formData.id) return;
    try {
      await apiEliminarImagen(formData.id, mediaId);
      setImagenesExistentes((prev) => prev.filter((img) => img.id !== mediaId));
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar la imagen");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si hay subida en curso no permitir
    if (uploadProgress > 0 && uploadProgress < 100) {
      alert("Esperar a que termine la subida de imágenes.");
      return;
    }

    setSaving(true);
    try {
      const { marcaNombre, multimedia, id, ...rest } = formData;

      const payload = {
        ...rest,
        montoPorDia:
          rest.montoPorDia === "" || rest.montoPorDia == null
            ? null
            : Number(rest.montoPorDia),
        tipoCombustibleId:
          rest.tipoCombustibleId === "" ? null : Number(rest.tipoCombustibleId),
        modeloId: rest.modeloId === "" ? null : Number(rest.modeloId),
        tipoVehiculoId:
          rest.tipoVehiculoId === "" ? null : Number(rest.tipoVehiculoId),
        estadoId: rest.estadoId === "" ? null : Number(rest.estadoId),
      };

      // Crear o actualizar vehículo (intenta obtener id de forma robusta)
      const vehiculoGuardado = formData.id
        ? await actualizarVehiculo(formData.id, payload)
        : await crearVehiculo(payload);

      // Manejo robusto para extraer id (en caso la respuesta esté envuelta)
      const vehiculoId =
        vehiculoGuardado?.id ||
        vehiculoGuardado?.data?.id ||
        vehiculoGuardado?.vehiculo?.id ||
        formData.id;

      if (!vehiculoId) {
        // No se obtuvo id — abortar con error claro
        console.error(
          "No se obtuvo vehiculoId tras crear/actualizar:",
          vehiculoGuardado
        );
        throw new Error(
          "No se pudo obtener el id del vehículo desde la respuesta del servidor."
        );
      }

      // Subir imágenes nuevas si existen
      if (imagenes.length && vehiculoId) {
        setUploadProgress(0);

        try {
          const nuevas = await subirImagenes(vehiculoId, imagenes, {
            // asegúrate que el backend espera "files" como en tu controller:
            // @RequestParam("files") List<MultipartFile> files
            fieldName: "files",
            onUploadProgress: (progressEvent) => {
              // Algunos navegadores no siempre envían total; protegerse
              const total =
                progressEvent.total ||
                progressEvent.target?.getResponseHeader?.("Content-Length");
              if (!progressEvent.total && !total) return;
              const percent = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || total)
              );
              setUploadProgress(percent);
            },
          });

          // Añadir las nuevas imagenes que devolvió el backend
          setImagenesExistentes((prev) => [...prev, ...nuevas]);

          // Limpia previews/archivos locales
          previews.forEach((p) => p.preview && URL.revokeObjectURL(p.preview));
          setPreviews([]);
          setImagenes([]);
        } catch (uploadErr) {
          // Manejo específico de errores de subida:
          console.error(
            "Error subiendo imágenes:",
            uploadErr?.response || uploadErr
          );
          alert(
            "Ocurrió un error subiendo las imágenes. Revisa la consola para más detalles."
          );
          // opcional: aquí podrías revertir la creación del vehículo si quieres,
          // o simplemente dejar al usuario reintentar la subida.
        } finally {
          setUploadProgress(0);
        }
      }

      // Actualiza id si era creación
      if (!formData.id && vehiculoId) {
        setFormData((prev) => ({ ...prev, id: vehiculoId }));
      }

      // Llama onSubmit con el objeto devuelto por el backend
      onSubmit?.(vehiculoGuardado);
    } catch (err) {
      // Mejor logging para depuración
      console.error("handleSubmit error:", err);
      if (err?.response) {
        console.error("server status:", err.response.status);
        console.error("server data:", err.response.data);
        alert(
          `Error del servidor: ${err.response.status} - ${
            err.response.data?.message || JSON.stringify(err.response.data)
          }`
        );
      } else {
        alert(err.message || "Error guardando el vehículo o subiendo imágenes");
      }
    } finally {
      setSaving(false);
      setUploadProgress(0);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Cargando formulario...</div>
      </div>
    );
  }

  return (
    <form className="space-y-6 mb-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <input
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="noChasis"
          placeholder="No. Chasis"
          value={formData.noChasis}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="noMotor"
          placeholder="No. Motor"
          value={formData.noMotor}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="noPlaca"
          placeholder="No. Placa"
          value={formData.noPlaca}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="montoPorDia"
          type="number"
          step="0.01"
          placeholder="Monto por Día"
          value={formData.montoPorDia}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* Tipo de Combustible */}
        <select
          name="tipoCombustibleId"
          value={formData.tipoCombustibleId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccionar Tipo de Combustible</option>
          {tiposCombustible.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nombre || tipo.descripcion}
            </option>
          ))}
        </select>

        {/* Modelo */}
        <select
          name="modeloId"
          value={formData.modeloId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccionar Modelo</option>
          {modelos.map((modelo) => (
            <option key={modelo.id} value={modelo.id}>
              {modelo.nombre || modelo.descripcion}
            </option>
          ))}
        </select>

        {/* Marca derivada del modelo */}
        <input
          name="marcaNombre"
          placeholder="Marca"
          value={formData.marcaNombre || ""}
          readOnly
          className="border p-2 rounded bg-gray-100 text-gray-600"
        />

        {/* Tipo de Vehículo */}
        <select
          name="tipoVehiculoId"
          value={formData.tipoVehiculoId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccionar Tipo de Vehículo</option>
          {tiposVehiculo.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nombre || tipo.descripcion}
            </option>
          ))}
        </select>

        {/* Estado */}
        <select
          name="estadoId"
          value={formData.estadoId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccionar Estado</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.nombre || estado.descripcion}
            </option>
          ))}
        </select>
      </div>

      {/* Imágenes del vehículo */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agregar imágenes
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagenChange}
            className="block w-full text-sm text-gray-700"
          />
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, GIF hasta {MAX_MB}MB
          </p>

          {/* Barra de progreso */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-2">
              <div className="text-xs mb-1">
                Subiendo imágenes: {uploadProgress}%
              </div>
              <div className="w-full bg-gray-200 rounded h-2">
                <div
                  style={{ width: `${uploadProgress}%` }}
                  className="h-2 rounded"
                />
              </div>
            </div>
          )}
        </div>

        {/* Previews nuevas */}
        {previews.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-2">
              Nuevas imágenes
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previews.map((p, index) => (
                <div key={p.id} className="relative">
                  <img
                    src={p.preview}
                    alt={`Nueva ${index + 1}`}
                    className="w-full h-32 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => eliminarImagenNueva(index)}
                    aria-label="Eliminar imagen nueva"
                    className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Imágenes existentes */}
        {imagenesExistentes.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-2">
              Imágenes actuales
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imagenesExistentes.map((img) => (
                <div key={img.id} className="relative">
                  <img
                    src={
                      img.url ||
                      `/api/vehiculos/${formData.id}/multimedia/${img.id}`
                    }
                    alt={img.nombreArchivo || `Imagen ${img.id}`}
                    className="w-full h-32 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => eliminarImagenExistente(img.id)}
                    aria-label="Eliminar imagen existente"
                    className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mensaje vacío */}
        {imagenesExistentes.length === 0 && previews.length === 0 && (
          <p className="text-sm text-gray-500">No hay imágenes del vehículo.</p>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          disabled={saving || (uploadProgress > 0 && uploadProgress < 100)}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={saving || (uploadProgress > 0 && uploadProgress < 100)}
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default FormularioVehiculo;
