import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, FileText, BookOpen, Users } from "lucide-react";

// Single-file React app for "labfisge" (Laboratorio de Física General)
// - Uses TailwindCSS for styling (assumes Tailwind is configured in the project)
// - Framer Motion for small animations
// - lucide-react for icons
// How to use:
// 1) Create a React app (e.g., Vite or Create React App)
// 2) Install dependencies: framer-motion, lucide-react
//    npm i framer-motion lucide-react
// 3) Configure TailwindCSS following its docs
// 4) Place this file as src/App.jsx and run the app

const SAMPLE_PRACTICAS = [
  {
    id: "cinematica",
    title: "Cinemática",
    descripcion:
      "Estudio del movimiento: posición, velocidad y aceleración. Ideal para introducir mediciones con cronómetros y sensores.",
    objetivos: [
      "Medir trayectorias rectilíneas",
      "Calcular velocidad promedio y aceleración",
    ],
    equipos: ["Cronómetro", "Carrito", "Pista inclinada", "Regla"],
  },
  {
    id: "oscilaciones",
    title: "Oscilaciones",
    descripcion:
      "Estudio de oscilaciones armónicas simples: péndulo y masa-resorte. Medición de periodo y amortiguamiento.",
    objetivos: ["Medir periodo de un péndulo", "Calcular constante elástica k"],
    equipos: ["Péndulo", "Resorte", "Sensor de posición"],
  },
  {
    id: "electricidad",
    title: "Electricidad básica",
    descripcion:
      "Circuitos sencillos con resistencias, fuentes y multímetro. Ley de Ohm y circuitos en serie/paralelo.",
    objetivos: ["Verificar la ley de Ohm", "Medir resistencias equivalentes"],
    equipos: ["Fuentes", "Resistencias", "Protoboard", "Multímetro"],
  },
];

export default function App() {
  const [route, setRoute] = useState("home");
  const [practicas] = useState(SAMPLE_PRACTICAS);
  const [selected, setSelected] = useState(null);
  const [uploaded, setUploaded] = useState([]);
  const [contactData, setContactData] = useState({ name: "", email: "", msg: "" });

  function handleUpload(e) {
    const files = Array.from(e.target.files || []);
    const mapped = files.map((f) => ({ name: f.name, url: URL.createObjectURL(f), size: f.size }));
    setUploaded((u) => [...mapped, ...u]);
    e.target.value = null;
  }

  function handleContactSubmit(ev) {
    ev.preventDefault();
    // This is a frontend-only demo. In a real site, send data to backend or email service.
    alert(`Mensaje enviado. Nombre: ${contactData.name} — Email: ${contactData.email}`);
    setContactData({ name: "", email: "", msg: "" });
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/20 p-2">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">labfisge</h1>
              <p className="text-xs opacity-90">Laboratorio de Física General — Recursos y prácticas</p>
            </div>
          </div>
          <nav className="flex gap-3 items-center">
            <NavButton active={route === "home"} onClick={() => setRoute("home")}>Inicio</NavButton>
            <NavButton active={route === "guia"} onClick={() => setRoute("guia")}>Guías</NavButton>
            <NavButton active={route === "material"} onClick={() => setRoute("material")}>Material</NavButton>
            <NavButton active={route === "recursos"} onClick={() => setRoute("recursos")}>Recursos</NavButton>
            <NavButton active={route === "contacto"} onClick={() => setRoute("contacto")} icon={<Mail className="w-4 h-4" />}>Contacto</NavButton>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {route === "home" && (
          <section>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-3">Bienvenido a <span className="text-indigo-600">labfisge</span></h2>
                <p className="mb-4 text-lg">Recursos para estudiantes y docentes: guías de prácticas, material teórico y recursos descargables para el laboratorio de Física General.</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white" onClick={() => setRoute("guia")}>Ver guías</button>
                  <button className="px-4 py-2 rounded-lg border" onClick={() => setRoute("recursos")}>Recursos</button>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-2">Práctica destacada</h3>
                <p className="text-sm text-gray-700 mb-4">Cinemática — medición de posiciones y tiempos con sensores y cronómetros.</p>
                <div className="grid grid-cols-2 gap-3">
                  <Stat label="Prácticas" value={practicas.length} />
                  <Stat label="Archivos subidos" value={uploaded.length} />
                </div>
              </div>
            </motion.div>

            <section className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Últimas guías</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {practicas.map((p) => (
                  <PracticeCard key={p.id} p={p} onOpen={() => { setSelected(p); setRoute("practica"); }} />
                ))}
              </div>
            </section>
          </section>
        )}

        {route === "guia" && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Guías de Experiencias</h2>
            <p className="mb-4">Seleccioná una práctica para ver los detalles, objetivos y materiales.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {practicas.map((p) => (
                <div key={p.id} className="bg-white p-4 rounded shadow">
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{p.descripcion}</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded border" onClick={() => { setSelected(p); setRoute("practica"); }}>Abrir</button>
                    <button className="px-3 py-1 rounded border" onClick={() => alert('Descarga de PDF (demo)')}>Descargar PDF</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {route === "practica" && selected && (
          <section>
            <button className="text-sm underline mb-3" onClick={() => setRoute("guia")}>&larr; Volver a guías</button>
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
              <p className="text-gray-700 mb-4">{selected.descripcion}</p>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold">Objetivos</h4>
                  <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                    {selected.objetivos.map((o, i) => <li key={i}>{o}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Equipos</h4>
                  <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                    {selected.equipos.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Material descargable</h4>
                  <p className="text-sm text-gray-700 mt-2">PDFs, hojas de datos y plantillas de informe.</p>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 rounded border">Ver PDF</button>
                    <button className="px-3 py-1 rounded border">Descargar plantilla</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {route === "material" && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Material Teórico</h2>
            <p className="mb-4">Resumenes, fórmulas y ejercicios para preparar las prácticas.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <article className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold">Fórmulas importantes</h4>
                <pre className="mt-2 text-sm bg-gray-100 p-3 rounded">E.g. v = Δx / Δt | a = Δv / Δt</pre>
              </article>
              <article className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold">Ejercicios resueltos</h4>
                <p className="text-sm text-gray-700 mt-2">Problemas tipo y soluciones paso a paso.</p>
              </article>
            </div>
          </section>
        )}

        {route === "recursos" && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Recursos</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold">Subir recursos (PDF, imágenes)</h4>
                <p className="text-sm text-gray-600">Arrastrar o seleccionar archivos para compartir con el curso.</p>
                <input className="mt-3" type="file" accept="application/pdf,image/*" multiple onChange={handleUpload} />
                <ul className="mt-3">
                  {uploaded.map((f, i) => (
                    <li key={i} className="text-sm">
                      <a href={f.url} target="_blank" rel="noreferrer" className="underline">{f.name}</a> <span className="text-xs text-gray-500">({Math.round(f.size/1024)} KB)</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold">Enlaces útiles</h4>
                <ul className="mt-2 text-sm text-gray-700 list-disc ml-5">
                  <li>Simuladores PhET</li>
                  <li>Manual de seguridad del laboratorio</li>
                  <li>Bases de datos de laboratorio</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {route === "contacto" && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Contacto</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <form onSubmit={handleContactSubmit} className="bg-white p-4 rounded shadow">
                <label className="block text-sm">Nombre</label>
                <input value={contactData.name} onChange={(e) => setContactData({ ...contactData, name: e.target.value })} className="w-full border rounded px-2 py-1 mt-1 mb-2" />
                <label className="block text-sm">Email</label>
                <input value={contactData.email} onChange={(e) => setContactData({ ...contactData, email: e.target.value })} className="w-full border rounded px-2 py-1 mt-1 mb-2" />
                <label className="block text-sm">Mensaje</label>
                <textarea value={contactData.msg} onChange={(e) => setContactData({ ...contactData, msg: e.target.value })} className="w-full border rounded px-2 py-1 mt-1 mb-3" rows={5} />
                <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">Enviar</button>
              </form>

              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold">Información</h4>
                <p className="text-sm text-gray-700 mt-2">Docentes: Prof. Ejemplo (ejemplo@uni.edu)</p>
                <p className="text-sm text-gray-700 mt-2">Horario de atención: Lunes a viernes, 10:00 - 17:00</p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600 flex justify-between">
          <div>© {new Date().getFullYear()} labfisge — Laboratorio de Física General</div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2"><Users className="w-4 h-4"/> Equipo</div>
            <div className="flex items-center gap-2"><FileText className="w-4 h-4"/> Documentación</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Small UI components
function NavButton({ children, active, onClick, icon }){
  return (
    <button onClick={onClick} className={`px-3 py-2 rounded-lg text-sm ${active ? 'bg-white/20' : 'hover:bg-white/10'}`}>{icon ? <span className="mr-2 inline-block align-middle">{icon}</span> : null}{children}</button>
  );
}

function Stat({ label, value }){
  return (
    <div className="p-3 bg-gray-50 rounded">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

function PracticeCard({ p, onOpen }){
  return (
    <motion.article whileHover={{ y: -4 }} className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold">{p.title}</h4>
      <p className="text-sm text-gray-600 mt-1">{p.descripcion}</p>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-1 rounded border text-sm" onClick={onOpen}>Abrir</button>
        <button className="px-3 py-1 rounded border text-sm" onClick={() => alert('Vista previa (demo)')}>Vista previa</button>
      </div>
    </motion.article>
  );
}
