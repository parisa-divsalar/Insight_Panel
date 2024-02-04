import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#606c48',
        },
    },
    typography: {
        fontFamily: ['shabnam'].join(','),
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    width: '100%',

                    '&::before ': {
                        border: 'none',
                    },

                    '&::after': {
                        border: 'none',
                    },

                    '&:hover:not(.Mui-disabled, .Mui-error)::before': {
                        border: 'none',
                    },

                    '& input[type="number"]': {
                        MozAppearance: 'textfield',
                    },

                    '& input[type="number"]::-webkit-outer-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },

                    '& input[type="number"]::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    textAlign: 'center',
                },
            },
        },
    },
})
