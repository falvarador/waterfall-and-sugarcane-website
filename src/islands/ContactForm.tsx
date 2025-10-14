import { useState } from 'preact/hooks';

type FormData = {
    name: string;
    email: string;
    message: string;
};

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });

    const handleChange = (e: preact.TargetedEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSubmit = (e: preact.TargetedSubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Lógica de envío de formulario (API, fetch, etc.)
        console.log('Form submitted:', formData);
        alert('Gracias por tu mensaje. Nos pondremos en contacto pronto.');
        setFormData({ name: '', email: '', message: '' }); // Limpiar formulario
    };

    return (
        <form onSubmit={handleSubmit} class="space-y-6">
            <div>
                <label htmlFor="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green" 
                />
            </div>
            <div>
                <label htmlFor="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green" 
                />
            </div>
            <div>
                <label htmlFor="message" class="block text-sm font-medium text-gray-700">Mensaje</label>
                <textarea 
                    name="message" 
                    id="message" 
                    rows={5} 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green"
                ></textarea>
            </div>
            <div>
                <button 
                    type="submit" 
                    class="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300"
                >
                    Enviar
                </button>
            </div>
        </form>
    );
};