import LayoutCliente from "../../components/common/LayoutCliente";

const SobreNosotros = () => {
  return (
    <LayoutCliente>
      <div className="max-w-7xl mx-auto text-gray-800 px-6 py-12">

        {/* Encabezado */}
        <section className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-xl shadow-lg -z-10"></div>
          <h1 className="text-5xl font-extrabold text-blue-800 mb-4 animate-fadeIn">
            Sobre Nosotros
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conoce la historia, misión, visión y valores que nos impulsan a ofrecer el mejor
            servicio de alquiler de vehículos en <span className="font-semibold">Acceleraite Rent Car</span>.
          </p>
        </section>

        {/* Historia */}
        <section className="mb-16 flex flex-col md:flex-row items-center gap-10">
          <img
            src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d"
            alt="Nuestra historia"
            className="rounded-xl shadow-lg w-full md:w-1/2 object-cover"
          />
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Nuestra Historia</h2>
            <p className="leading-relaxed text-gray-700">
              Acceleraite nació en 2025 con el propósito de revolucionar el servicio de alquiler de
              vehículos en el pais. Empezamos como un pequeño negocio con solo tres vehículos,
              pero con una gran visión: ofrecer un servicio rápido, seguro y accesible.
              Con esfuerzo y dedicación, hemos crecido hasta contar con una flota moderna y diversa,
              siempre priorizando la satisfacción y seguridad de nuestros clientes.
            </p>
          </div>
        </section>

        {/* Misión, Visión y Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Misión */}
          <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">Misión</h3>
            <p className="text-gray-700">
              Ofrecer soluciones de transporte confiables y eficientes, superando las expectativas
              de nuestros clientes mediante un servicio personalizado y de alta calidad.
            </p>
          </div>

          {/* Visión */}
          <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">Visión</h3>
            <p className="text-gray-700">
              Ser la empresa líder en alquiler de vehículos en el país, reconocida por su innovación,
              compromiso y excelencia en la atención al cliente.
            </p>
          </div>

          {/* Valores */}
          <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">Valores</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Compromiso con el cliente</li>
              <li>Transparencia y honestidad</li>
              <li>Innovación constante</li>
              <li>Respeto por el medio ambiente</li>
              <li>Trabajo en equipo</li>
            </ul>
          </div>
        </div>

        {/* Cierre inspirador */}
        <section className="mt-16 text-center">
          <p className="text-lg text-gray-700 max-w-2xl mx-auto italic">
            “En Acceleraite, no solo alquilamos vehículos, creamos experiencias que te llevan a tu destino con seguridad y estilo.”
          </p>
        </section>
      </div>
    </LayoutCliente>
  );
};

export default SobreNosotros;