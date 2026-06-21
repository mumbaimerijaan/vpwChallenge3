const AppConfig = {
    GLOBAL_AVERAGE_EMISSIONS: 4.7,
    BASE_IMPACT: 0.5,
    SCORE_BANDS: [
        { max: 3.0, title: 'Climate Champion', desc: 'You are leading the way! Your footprint is remarkably low.', badge: '🏆' },
        { max: 5.5, title: 'Conscious Citizen', desc: 'Good effort! You make many eco-friendly choices but have room to improve.', badge: '🌍' },
        { max: Infinity, title: 'Eco Explorer', desc: 'You are just beginning your journey. Focus on reducing major impact areas.', badge: '🌱' }
    ],
    INSIGHT_MESSAGES: {
        'How You Move': "Your travel habits significantly shape your carbon footprint. Opt for public transit or carpooling.",
        'How You Live': "Home energy use is your primary driver. Consider energy-efficient appliances or reducing AC usage.",
        'How You Eat': "Your diet heavily influences your footprint. Incorporating more plant-based meals makes a huge difference.",
        'How You Shop': "Consumption of goods is your largest impact area. Prioritize reusable items and mindful shopping.",
        'Your Lifestyle': "Everyday digital and lifestyle habits are your main emission sources. Focus on efficiency."
    },
    COLORS: ['#8070FF', '#28C76F', '#FF9F43', '#FF70A6', '#4A90E2'],
    ICONS: ['🚗', '🏠', '🍽️', '🛍️', '💬']
};

window.AppConfig = AppConfig;
