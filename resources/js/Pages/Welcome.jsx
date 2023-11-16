import ButtonMasukan from '@/Components/ButtonMasukan';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function Welcome({ auth }) {
    const handleButtonClick = (tanggapan) => {
        Inertia.post('/masukan', { tanggapan })
        Swal.fire({
            title: "Masukan Diterima",
            text: "Terima Kasih Atas Masukannya",
            icon: "success"
        });
    };
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>
                        </>
                    )}
                </div>
                <div className='fixed top-52'>
                    <span className='text-2xl font-extrabold text-gray-700'>
                        MASUKAN ANDA SANGAT BERARTI BAGI KAMI
                    </span>
                    <span className='text-2xl ml-1'>
                        🙏🏻
                    </span>
                </div>
                <div className='flex items-center'>
                    <ButtonMasukan 
                        className='bg-red-600 hover:bg-red-700 hover:scale-105 transition-transform duration-50 mx-2 w-72 flex justify-center shadow-2xl border-b-4 border-r-4 border-black rounded-2xl border-gray-800'
                        onClick={() => handleButtonClick('Tidak Puas')}>
                        <span className='text-5xl'>😠</span>
                        <span className='ml-1'>Tidak Puas</span>
                    </ButtonMasukan>
                    <ButtonMasukan 
                        className='bg-yellow-600 hover:bg-yellow-700 hover:scale-105 transition-transform duration-50 mx-2 w-72 flex justify-center shadow-2xl border-b-4 border-r-4 border-black rounded-2xl border-gray-800'
                        onClick={() => handleButtonClick('Cukup Puas')}>
                        <span className='text-5xl'>🙂</span>
                        <span className='ml-1'>Cukup Puas</span>
                    </ButtonMasukan>
                    <ButtonMasukan 
                        className='bg-green-600 hover:bg-green-700 hover:scale-105 transition-transform duration-50 mx-2 w-72 flex justify-center shadow-2xl border-b-4 border-r-4 border-black rounded-2xl border-gray-800'
                        onClick={() => handleButtonClick('Puas')}>
                        <span className='text-5xl'>😄</span>
                        <span className='ml-1'>Puas</span>
                    </ButtonMasukan>
                    <ButtonMasukan 
                        className='bg-sky-600 hover:bg-sky-700 hover:scale-105 transition-transform duration-50 mx-2 w-72 flex justify-center shadow-2xl border-b-4 border-r-4 border-black rounded-2xl border-gray-800'
                        onClick={() => handleButtonClick('Sangat Puas')}>
                        <span className='text-5xl'>🤩</span>
                        <span className='ml-1'>Sangat Puas</span>
                    </ButtonMasukan>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}