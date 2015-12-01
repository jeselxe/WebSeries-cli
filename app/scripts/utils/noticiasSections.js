export default function newsSections(code) {
    switch (code) {
        case 'ultimas':
            return "Últimas Notícias"
            break;
        case 'mas_vistas':
            return "Notícias Más Vistas";
        case 'mas_votadas':
            return "Más Votadas";
        case 'top':
            return 'Top Notícias';
        case 'promocionadas':
            return 'Notícias Promocionadas';
        default:
            return 'No especificado';
    }
}
