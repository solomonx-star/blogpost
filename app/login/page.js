
import LoginForm from '@/components/forms/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
           

            {/* <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"> */}
                {/* <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"> */}
                    <LoginForm />
                {/* </div> */}
            {/* </div> */}
        </div>
    );
}
