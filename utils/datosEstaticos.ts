export const Tarifas: TarifaDescription[] = [
    { name: "2.0 TD", value: 202020 },
    { name: "3.0 TD", value: 202030 },
    { name: "6.1 TD", value: 202061 },
    { name: "6.2 TD", value: 202062 },
]

export const TiposModalidad = [
    { name: "Pass Through", value: 1 },
    { name: "Index Genesis", value: 2 },
    { name: "Index Infinity", value: 3 },
] as TipoModalidad[]


export const GOPs = () => {
    const items = Array.from({ length: 36 }, (_, i) => ({ label: `GOP ${i}`, value: i }));
    return items;
}