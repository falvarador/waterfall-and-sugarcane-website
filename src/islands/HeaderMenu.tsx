import { useState } from 'preact/hooks';

interface Props {
    navLinks: string[];
    socialLinksSlot: preact.JSX.Element;
}

export default function HeaderMenu({ navLinks, socialLinksSlot }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            {/* Botón para abrir/cerrar el menú (Versión Móvil) */}
            <div class="lg:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                    {/* El SVG de la hamburguesa/cierre sí debe estar aquí */}
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
            </div>

            {/* Menú Móvil */}
            {isMenuOpen && (
                <div class="lg:hidden absolute top-[68px] left-0 w-full bg-white/95 backdrop-blur-sm pb-4 shadow-xl">
                    <nav class="flex flex-col items-center space-y-4">
                        {/* Renderizamos los enlaces de navegación, que son simples strings */}
                        {navLinks.map(link => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                onClick={() => setIsMenuOpen(false)}
                                class="text-gray-600 hover:text-brand-green transition-colors duration-300 py-1 w-full text-center"
                            >
                                {link}
                            </a>
                        ))}
                        <div class="flex items-center space-x-4 pt-4 border-t w-full justify-center">
                            {/* Asumimos que los enlaces sociales se pasan como un fragmento (slot) o prop HTML */}
                            {socialLinksSlot}
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}