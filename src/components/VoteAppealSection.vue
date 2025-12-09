<template>
    <!-- ১. ব্যাকগ্রাউন্ড কালার: সবুজ গ্র্যাডিয়েন্ট -->
    <section
        class="bg-gradient-to-br from-green-600 to-teal-800 dark:bg-green-950 py-12 overflow-hidden relative transition-colors duration-300 border-t border-b border-transparent dark:border-green-900">

        <!-- Background Decoration Pattern -->
        <div
            class="absolute top-0 left-0 w-full h-full bg-[url('/logo.png')] bg-repeat opacity-5 dark:opacity-5 transform scale-50 pointer-events-none">
        </div>

        <div
            class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10 relative z-10">

            <!-- ২. লোগো ও গ্রেডিয়েন্ট বর্ডার -->
            <div
                class="rounded-full p-1.5 bg-gradient-to-r from-red-500 to-orange-500 shadow-2xl animate-bounce-slow">
                <div class="bg-white dark:bg-gray-200 p-4 rounded-full">
                    <img src="/logo.png" alt="Marka" class="w-24 h-24 md:w-32 md:h-32 object-contain">
                </div>
            </div>

            <!-- Text Content -->
            <div class="text-center md:text-left text-white">
                
                <!-- ৩. টেক্সট কালার: সলিড সাদা (White) -->
                <!-- গ্রেডিয়েন্ট এবং ট্রান্সপারেন্ট ক্লাসগুলো সরিয়ে text-white দেওয়া হয়েছে -->
                <h2 class="text-3xl md:text-5xl font-bold mb-3 text-white drop-shadow-md">
                    দাড়িপাল্লা মার্কায় ভোট দিন
                </h2>
                
                <p class="text-green-100 dark:text-green-300 text-lg md:text-xl font-medium tracking-wide">
                    উন্নয়ন ও অগ্রগতির লক্ষ্যে আমাদের সাথেই থাকুন
                </p>
            </div>

            <!-- ৪. বাটন: ডিফল্ট গ্রেডিয়েন্ট, হোভারে সাদা -->
            <a href="#contact"
                class="px-10 py-4 rounded-full font-bold shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block cursor-pointer
                bg-gradient-to-r from-red-500 to-orange-500 text-white border-2 border-transparent
                hover:from-white hover:to-white hover:text-red-600 hover:border-red-500">
                সমর্থন জানান
            </a>
        </div>
    </section>
</template>

<style scoped>
/* Slow Bounce Animation */
@keyframes bounce-slow {
    0%, 100% {
        transform: translateY(-5%);
    }
    50% {
        transform: translateY(5%);
    }
}

.animate-bounce-slow {
    animation: bounce-slow 3s infinite ease-in-out;
}
</style>