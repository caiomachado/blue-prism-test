export const theme = {
    palette: {
        blue: "#5353d6",
        darkBlue: "#5383d6",
        green: "#32cf32",
        danger: "#e62323",
        white: "white",
        black: "black",
    },
    breakpoints: {
        xxs: 520,
        xs: 768,
        sm: 968,
        md: 1120,
        lg: 1576,
        xl: 1920,
    }
}

export const dateFormatter = (date: string) => {
    return date.split('T')[0].replaceAll('-', '/').split('/').reverse().join('/')
}