export const products = [
     {
        id: 1, 
        title: 'Adidas Samba OG', 
        category: 'classic', 
        gender: ['men', 'women'], 
        price: 14990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            white: [
                "images/Adidas_Samba_OG.png",
                "images/Adidas_Samba_OG_front.png",
                "images/Adidas_Samba_OG_side.png",
                "images/Adidas_Samba_OG_back.png"
            ],

            black: [
                "images/Adidas_Samba_OG_Black.png",
                "images/Adidas_Samba_OG_Black_front.png",
                "images/Adidas_Samba_OG_Black_side.png",
                "images/Adidas_Samba_OG_Black_back.png"
            ],

            multicolor: [
                "images/Adidas_Samba_OG_Green.png",
                "images/Adidas_Samba_OG_Green_front.png",
                "images/Adidas_Samba_OG_Green_side.png",
                "images/Adidas_Samba_OG_Green_back.png"
            ],
            castomBeige: [
                "images/Adidas_Samba_OG_Beige.png",
                "images/Adidas_Samba_OG_Beige_front.png",
                "images/Adidas_Samba_OG_Beige_side.png",
                "images/Adidas_Samba_OG_Beige_back.png"
            ]
        },
        colors: [
            {name: 'white', value: '#ffffff'},
            {name: 'black', value: '#000000'},
            {name: 'multicolor', value: 'linear-gradient(90deg, #0B503B 50%, #283654 50%)'},
            {name: 'castomBeige', value: '#E9E3D3'}
        ]
    },
    {
        id: 2, 
        title: 'Adidas Ultraboots', 
        category: 'sport', 
        gender: 'men',
        price: 23990,
        sizes: [37, 38, 39, 40, 41, 42, 43], 
        images: {
            white: [
                'images/Adidas_UltraBoots.png',
                'images/Adidas_Ultraboots_front.png',
                'images/Adidas_Ultraboots_side.png',
                'images/Adidas_Ultraboots_back.png'
            ],
            black: [
                'images/Adidas_Ultraboots_Black.png',
                'images/Adidas_Ultraboots_Black_front.png',
                'images/Adidas_Ultraboots_Black_side.png',
                'images/Adidas_Ultraboots_Black_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#ffffff'},
            {name: 'black', value: '#000000'}
        ]
    },
    {
        id: 3, 
        title: 'Adidas Gazelle', 
        category: 'classic', 
        gender: ['men', 'women'], 
        price: 12990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            black: [
                'images/image_gazelle.png',
                'images/Adidas_Gazelle_front.png',
                'images/Adidas_Gazelle_side.png',
                'images/Adidas_Gazelle_back.png'
            ],
            castomRed: [
                'images/Adidas_Gazelle_Red.png',
                'images/Adidas_Gazelle_Red_front.png',
                'images/Adidas_Gazelle_Red_side.png',
                'images/Adidas_Gazelle_Red_back.png'
            ],
            castomGreen: [
                'images/Adidas_Gazelle_Green.png',
                'images/Adidas_Gazelle_Green_front.png',
                'images/Adidas_Gazelle_Green_side.png',
                'images/Adidas_Gazelle_Green_back.png'
            ],
            castomBlue: [
                'images/Adidas_Gazelle_Blue.png',
                'images/Adidas_Gazelle_Blue_front.png',
                'images/Adidas_Gazelle_Blue_side.png',
                'images/Adidas_Gazelle_Blue_back.png'
            ]
        },
        colors: [
            {name: 'black', value: '#000000'},
            {name: 'castomRed', value: '#8F2039'},
            {name: 'castomGreen', value: '#0C564B'},
            {name: 'castomBlue', value: '#425581'}
        ]
    },
    {
        id: 4, 
        title: 'Adidas Superstar', 
        category: 'classic', 
        gender: ['men', 'women'], 
        price: 11990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            white: [
                'images/image_superstar.png',
                'images/Superstar_front.png',
                'images/Superstar_side.png',
                'images/Superstar_back.png'
            ],
            black: [
                'images/Superstar_Black.png',
                'images/Superstar_Black_front.png',
                'images/Superstar_Black_side.png',
                'images/Superstar_Black_back.png'
            ],
            multicolor1: [
                'images/Adidas_Superstar_RGB.png',
                'images/Superstar_RGB_front.png',
                'images/Superstar_RGB_side.png',
                'images/Superstar_RGB_back.png'
            ],
            multicolor2: [
                'images/Adidas_Superstar_Orange.png',
                'images/Superstar_Orange_front.png',
                'images/Superstar_Orange_side.png',
                'images/Superstar_Orange_back.png'
            ],
            multicolor3: [
                'images/Adidas_Superstar_Red.png',
                'images/Superstar_Red_front.png',
                'images/Superstar_Red_side.png',
                'images/Superstar_Red_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#ffffff'},
            {name: 'black', value: '#000000'},
            {name: 'multicolor1', value: 'linear-gradient(90deg, #066C30 13%, #FFEC1C 37%, #0231A4 53%, #BA0412 91%)'},
            {name: 'multicolor2', value: 'linear-gradient(90deg, #E1E0E3 50%, #E55300 50%)'},
            {name: 'multicolor3', value: 'linear-gradient(90deg, #DDDEE2 50%, #FF0015 50%)'}
        ]
    },
    {
        id: 5, 
        title: 'Adidas NMD_S1', 
        category: 'sport', 
        gender: 'men', 
        price: 16990,
        sizes: [37, 38, 39, 40, 41, 42, 43], 
        images: {
            white: [
                'images/Adidas_NMD_S1.png',
                'images/NMD_front.png',
                'images/NMD_side.png',
                'images/NMD_back.png'
            ],
            black: [
                'images/Adidas_NMD_S1_Black.png',
                'images/NMD_Black_front.png',
                'images/NMD_Black_side.png',
                'images/NMD_Black_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#ffffff'},
            {name: 'black', value: '#000000'}
        ]
    },
    {
        id: 6, 
        title: 'Adidas Campus 00s', 
        category: 'classic', 
        gender: ['men', 'women'], 
        price: 13990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            castomBrown: [
                'images/Adidas_Campus_00_s_Brown.png',
                'images/Campus_Brown_front.png',
                'images/Campus_Brown_side.png',
                'images/Campus_Brown_back.png'
            ],
            black: [
                'images/image_campus.png',
                'images/Campus_front.png',
                'images/Campus_side.png',
                'images/Campus_back.png'
            ],
            white: [
                'images/Adidas_Campus_00_s_White.png',
                'images/Campus_White_front.png',
                'images/Campus_White_side.png',
                'images/Campus_White_back.png'
            ],
            castomGreen: [
                'images/Adidas_Campus_00_s_Green.png',
                'images/Campus_Green_front.png',
                'images/Campus_Green_side.png',
                'images/Campus_Green_back.png'
            ],
            castomGrey: [
                'images/Adidas_Campus_00_s_Grey.png',
                'images/Campus_Grey_front.png',
                'images/Campus_Grey_side.png',
                'images/Campus_Grey_back.png'
            ],
            castomBlue: [
                'images/Adidas_Campus_00_s_Blue.png',
                'images/Campus_Blue_front.png',
                'images/Campus_Blue_side.png',
                'images/Campus_Blue_back.png'
            ],
            castomRed: [
                'images/Adidas_Campus_00_s_Red.png',
                'images/Campus_Red_front.png',
                'images/Campus_Red_side.png',
                'images/Campus_Red_back.png'
            ]
        },
        colors: [
            {name: 'castomBrown', value: '#C37522'},
            {name: 'black', value: '#000000'},
            {name: 'white', value: '#ffffff'},
            {name: 'castomGreen', value: '#204D3F'},
            {name: 'castomGrey', value: '#868584'},
            {name: 'castomBlue', value: '#304BB2'},
            {name: 'castomRed', value: '#A50F17'}
        ]
    },
    {
        id: 7, 
        title: 'Adidas Stan Smith', 
        category: 'classic', 
        gender: ['men', 'women'], 
        price: 12990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            multicolor: [
                'images/Adidas_Stan_Smith_Green.png',
                'images/Stan_Green_front.png',
                'images/Stan_Green_side.png',
                'images/Stan_Green_back.png'
            ],
            white: [
                'images/Adidas_Stan_Smith.png',
                'images/Stan_front.png',
                'images/Stan_side.png',
                'images/Stan_back.png',
            ],
            black: [
                'images/Adidas_Stan_Smith_Black.png',
                'images/Stan_Black_front.png',
                'images/Stan_Black_side.png',
                'images/Stan_Black_back.png'
            ],
            
        },
        colors: [
            {name: 'multicolor', value: 'linear-gradient(90deg, #CACDD2 50%, #007D40 50%)'},
            {name: 'white', value: '#ffffff'},
            {name: 'black', value: '#000000'},
        ]
    },
    {
        id: 8, 
        title: 'Adidas NITEBALL', 
        category: 'sport', 
        gender: 'men',
        isNew: true,
        price: 14990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            black: [
                'images/Adidas_NITEBALL.png',
                'images/Niteball_front.png',
                'images/Niteball_side.png',
                'images/Niteball_back.png'
            ],
            castomGrey: [
                'images/Adidas_NITEBALL_Grey.png',
                'images/Niteball_Grey_front.png',
                'images/Niteball_Grey_side.png',
                'images/Niteball_Grey_back.png'
            ],
            castomGreen: [
                'images/Adidas_NITEBALL_Green.png',
                'images/Niteball_Green_front.png',
                'images/Niteball_Green_side.png',
                'images/Niteball_Green_back.png'
            ],
            castomBeige: [
                'images/Adidas_NITEBALL_Beige.png',
                'images/Niteball_Beige_front.png',
                'images/Niteball_Beige_side.png',
                'images/Niteball_Beige_back.png'
            ]
        },
        colors: [
            {name: 'black', value: '#000000'},
            {name: 'castomGrey', value: '#8D8C8C'},
            {name: 'castomGreen', value: '#806B34'},
            {name: 'castomBeige', value: '#D6BB93'}
        ]
    },
    {
        id: 9,
        title: 'Adidas HANDBALL Spezial', 
        category: 'classic', 
        gender: 'men', 
        price: 15990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            castomBlue: [
                'images/Adidas_HANDBALL_Spezial_Blue.png',
                'images/Spezial_Blue_front.png',
                'images/Spezial_Blue_side.png',
                'images/Spezial_Blue_back.png'
            ],
            black: [
                'images/Adidas_Handball_Spezial.png',
                'images/Spezial_front.png',
                'images/Spezial_side.png',
                'images/Spezial_back.png'
            ],
            castomBurguondy: [
                'images/Adidas_HANDBALL_Spezial_ Burgundy.png',
                'images/Spezial_Burgundy_front.png',
                'images/Spezial_Burgundy_side.png',
                'images/Spezial_Burgundy_back.png'
            ],
            white: [
                'images/Adidas_HANDBALL_Spezial_White.png',
                'images/Spezial_White_front.png',
                'images/Spezial_White_side.png',
                'images/Spezial_White_back.png'
            ],
            castomGrey: [
                'images/Adidas_HANDBALL_Spezial_Grey.png',
                'images/Spezial_Grey_front.png',
                'images/Spezial_Grey_side.png',
                'images/Spezial_Grey_back.png'
            ],
            castomBeige: [
                'images/Adidas_HANDBALL_Spezial_Beige.png',
                'images/Spezial_Beige_front.png',
                'images/Spezial_Beige_side.png',
                'images/Spezial_Beige_back.png'
            ]
        },
        colors: [
            {name: 'castomBlue', value: '#67ABD1'},
            {name: 'black', value: '#000000'},
            {name: 'castomBurguondy', value: '#54263A'},
            {name: 'white', value: '#ffffff'},
            {name: 'castomGrey', value: '#A1A19E'},
            {name: 'castomBeige', value: '#E9DAC6'}
        ]
    },
    {
        id: 10, 
        title: 'Adidas OZMILLEN', 
        category: 'sport', 
        gender: ['men', 'women'],
        isNew: true,
        price: 12299, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            white: [
                'images/Adidas_Ozmillen.png',
                'images/Ozmillen_front.png',
                'images/Ozmillen_side.png',
                'images/Ozmillen_back.png'
            ],
            black: [
                'images/Adidas_OZMILLEN_Black.png',
                'images/Ozmillen_Black_front.png',
                'images/Ozmillen_Black_side.png',
                'images/Ozmillen_Black_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#ffffff'},
            {name: 'black', value: '#000000'} 
        ]
    },
    {
        id: 11, 
        title: 'Adidas NITEBALL III', 
        category: 'sport', 
        gender: ['men', 'women'], 
        price: 9499, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            multicolor: [
                'images/Adidas_Niteball_III.png',
                'images/Niteball_III_front.png',
                'images/Niteball_III_side.png',
                'images/Niteball_III_back.png'
            ]
        },
        colors: [
            {name: 'multicolor', value: 'linear-gradient(90deg, #C7797E 50%, #585875 50%)'}
        ]
    },
    {
        id: 12, 
        title: 'Adidas Samba XLG', 
        category: 'classic', 
        gender: 'men', 
        price: 10999, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            black: [
                'images/Adidas_Samba_XLG.png',
                'images/Samba_XLG_front.png',
                'images/Samba_XLG_side.png',
                'images/Samba_XLG_back.png'
            ],
            castomBrown: [
                'images/Adidas_Samba_XLG_Brown.png',
                'images/Samba_XLG_Brown_front.png',
                'images/Samba_XLG_Brown_side.png',
                'images/Samba_XLG_Brown_back.png'
            ]
        },
        colors: [
            {name: 'black', value: '#000000'},
            {name: 'castomBrown', value: '#8F826B'}
        ]
    },
    {
        id: 13, 
        title: 'Adidas Adistar Control', 
        category: 'sport', 
        gender: ['men', 'women'], 
        price: 13599, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            castomBeige: [
                'images/Adidas_Adistar_Control_Beige.png',
                'images/Adistar_Beige_front.png',
                'images/Adistar_Beige_side.png',
                'images/Adistar_Beige_back.png'
            ],
            castomGrey: [
                'images/Adidas_Adistar_Control.png',
                'images/Adistar_Grey_front.png',
                'images/Adistar_Grey_side.png',
                'images/Adistar_Grey_back.png'
            ],
            castomBrown: [
                'images/Adidas_Adistar_Control_Brown.png',
                'images/Adistar_Brown_front.png',
                'images/Adistar_Brown_side.png',
                'images/Adistar_Brown_back.png'
            ],
        },
        colors: [
            {name: 'castomBeige', value: '#D5BB96'},
            {name: 'castomGrey', value: '#9EA4A6'},
            {name: 'castomBrown', value: '#6E6B67'}
        ]
    },
    {
        id: 14, 
        title: 'Adidas FORUM LOW CL', 
        category: 'classic', 
        gender: 'men', 
        price: 15990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            multicolor1: [
                'images/Adidas_Forum_Low_CL_Blue.png',
                'images/Forum_Blue_front.png',
                'images/Forum_Blue_side.png',
                'images/Forum_Blue_back.png'
            ],
            black: [
                'images/Adidas_Forum_low_CL.png',
                'images/Forum_front.png',
                'images/Forum_side.png',
                'images/Forum_back.png'
            ],
            white: [
                'images/Adidas_Forum_Low_CL_White.png',
                'images/Forum_White_front.png',
                'images/Forum_White_side.png',
                'images/Forum_White_back.png'
            ],
            castomBeige: [
                'images/Adidas_Forum_Low_CL_Beige.png',
                'images/Forum_Beige_front.png',
                'images/Forum_Beige_side.png',
                'images/Forum_Beige_back.png'
            ],
            multicolor2: [
                'images/Adidas_Forum_Low_CL_Green.png',
                'images/Forum_Green_front.png',
                'images/Forum_Green_side.png',
                'images/Forum_Green_back.png'
            ]
        },
        colors: [
            {name: 'multicolor1', value: 'linear-gradient(90deg, #E2E0DC 50%, #144592 50%'},
            {name: 'black', value: '#000000'},
            {name: 'white', value: '#ffffff'},
            {name: 'castomBeige', value: '#E1D6C2'},
            {name: 'multicolor2', value: 'linear-gradient(90deg, #ECE6E1 50%, #18897E 50%)'}
        ]
    },
    {
        id: 15, 
        title: 'Adidas BREAK START MID', 
        category: 'classic', 
        gender: 'men', 
        price: 7990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            castomBlue: [
                'images/Adidas_Break_Start_Mid_Blue.png',
                'images/Mid_Blue_front.png',
                'images/Mid_Blue_side.png',
                'images/Mid_Blue_back.png'
            ],
            black: [
                'images/Adidas_Break_Start_Mid.png',
                'images/Mid_front.png',
                'images/Mid_side.png',
                'images/Mid_back.png'
            ],
            castomBeige: [
                'images/Adidas_Break_Start_Mid_Beige.png',
                'images/Mid_Beige_front.png',
                'images/Mid_Beige_side.png',
                'images/Mid_Beige_back.png'
            ],
            castomGreen: [
                'images/Adidas_Break_Start_Mid_Green.png',
                'images/Mid_Green_front.png',
                'images/Mid_Green_side.png',
                'images/Mid_Green_back.png'
            ]
        },
        colors: [
            {name: 'castomBlue', value: '#2E63AE'},
            {name: 'black', value: '#000000'},
            {name: 'castomBeige', value: '#E3E0D5'},
            {name: 'castomGreen', value: '#00826D'}
        ]
    },
    {
        id: 16, 
        title: 'Adidas OZWEEGO', 
        category: 'sport', 
        gender: 'men', 
        price: 17990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            castomKhaki: [
                'images/Adidas_Ozweego_Khaki.png',
                'images/Ozweego_Khaki_front.png',
                'images/Ozweego_Khaki_side.png',
                'images/Ozweego_Khaki_back.png'
            ],
            black: [
                'images/Adidas_Ozweego.png',
                'images/Ozweego_front.png',
                'images/Ozweego_side.png',
                'images/Ozweego_back.png'
            ],
            white: [
                'images/Adidas_Ozweego_White.png',
                'images/Ozweego_White_front.png',
                'images/Ozweego_White_side.png',
                'images/Ozweego_White_back.png'
            ],
            castomBeige: [
                'images/Adidas_Ozweego_Beige.png',
                'images/Ozweego_Beige_front.png',
                'images/Ozweego_Beige_side.png',
                'images/Ozweego_Beige_back.png'
            ],
        },
        colors: [
            {name: 'castomKhaki', value: '#645E4E'},
            {name: 'black', value: '#000000'},
            {name: 'white', value: '#FFFFFF'},
            {name: 'castomBeige', value: '#C9A075'}
        ]
    },
    {
        id: 17, 
        title: 'Adidas Campus Vulc', 
        category: 'classic', 
        gender: 'men', 
        isNew: true,
        price: 12990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            castomGreen: [
                'images/Adidas_Campus_Vulc_Green.png',
                'images/Vulc_Green_front.png',
                'images/Vulc_Green_side.png',
                'images/Vulc_Green_back.png'
            ],
            black: [
                'images/Adidas_Campus_Vulc.png',
                'images/Vulc_front.png',
                'images/Vulc_side.png',
                'images/Vulc_back.png'
            ],
            white: [
                'images/Adidas_Campus_Vulc_White.png',
                'images/Vulc_White_front.png',
                'images/Vulc_White_side.png',
                'images/Vulc_White_back.png'
            ]
        },
        colors: [
            {name: 'castomGreen', value: '#26564F'},
            {name: 'black', value: '#000000'},
            {name: 'white', value: '#FFFFFF'},
        ]
    },
    {
        id: 18, 
        title: 'Adidas EQUIPMENT', 
        category: 'sport', 
        gender: 'men', 
        price: 17790, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            black: [
                'images/Adidas_Equipment.png',
                'images/Equipment_front.png',
                'images/Equipment_side.png',
                'images/Equipment_back.png'
            ],
            castomBeige: [
                'images/Adidas_Equipment_Beige.png',
                'images/Equipment_Beige_front.png',
                'images/Equipment_Beige_side.png',
                'images/Equipment_Beige_back.png'
            ]
        },
        colors: [
            {name: 'black', value: '#000000'},
            {name: 'castomBeige', value: '#F5F1EB'}
        ]
    },
    {
        id: 19, 
        title: 'Adidas HOOPS 3.0', 
        category: 'classic', 
        gender: 'men', 
        price: 8990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            black: [
                'images/Adidas_Hoops_3.0.png',
                'images/Hoops_front.png',
                'images/Hoops_side.png',
                'images/Hoops_back.png'
            ],
            white: [
                'images/Adidas_Hoops_3.0_Mid_White.png',
                'images/Hoops_White_front.png',
                'images/Hoops_White_side.png',
                'images/Hoops_White_back.png'
            ]
        },
        colors: [
            {name: 'black', value: '#000000'},
            {name: 'white', value: '#FFFFFF'}
        ]
    },
    {
        id: 20, 
        title: 'Adidas RIVALRY LOW', 
        category: 'classic', 
        gender: 'men', 
        price: 18990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            multicolor2: [
                'images/Adidas_Rivalry_Low_Red.png',
                'images/Rivalry_Red_front.png',
                'images/Rivalry_Red_side.png',
                'images/Rivalry_Red_back.png'
            ],
            white: [
                'images/Adidas_Rivalry_Low.png',
                'images/Rivalry_front.png',
                'images/Rivalry_side.png',
                'images/Rivalry_back.png'
            ],
            multicolor1: [
                'images/Adidas_Rivalry_Low_White.png',
                'images/Rivalry_White_front.png',
                'images/Rivalry_White_side.png',
                'images/Rivalry_White_back.png',
            ],
            multicolor3: [
                'images/Adidas_Rivalry_Low_Blue.png',
                'images/Rivalry_Blue_front.png',
                'images/Rivalry_Blue_side.png',
                'images/Rivalry_Blue_back.png'
            ]
        },
        colors: [
            {name: 'multicolor2', value: 'linear-gradient(90deg, #EDEBE6 50%, #76091D 50%)'},
            {name: 'white', value: '#FFFFFF'},
            {name: 'multicolor1', value: 'linear-gradient(90deg, #E8E6E6 50%, #C5BEB1 50%)'},
            {name: 'multicolor3', value: 'linear-gradient(90deg, #EEEAE4 50%, #1B5CA6 50%)'}
        ]
    },
    {
        id: 21, 
        title: 'Adidas SL 72', 
        category: 'sport', 
        gender: 'men', 
        price: 13990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            black: [
                'images/Adidas_SL_72.png',
                'images/SL_front.png',
                'images/SL_side.png',
                'images/SL_back.png'
            ],
            white: [
                'images/Adidas_SL_72_White.png',
                'images/SL_White_front.png',
                'images/SL_White_side.png',
                'images/SL_White_back.png'
            ],
            castomRed: [
                'images/Adidas_SL_72_Red.png',
                'images/SL_Red_front.png',
                'images/SL_Red_side.png',
                'images/SL_Red_back.png'
            ],
            castomBlue: [
                'images/Adidas_SL_72_Blue.png',
                'images/SL_Blue_front.png',
                'images/SL_Blue_side.png',
                'images/SL_Blue_back.png'
            ],
            castomBrown: [
                'images/Adidas_SL_72_Brown.png',
                'images/SL_Brown_front.png',
                'images/SL_Brown_side.png',
                'images/SL_Brown_back.png'
            ],
            castomBeige: [
                'images/Adidas_SL_72_Beige.png',
                'images/SL_Beige_front.png',
                'images/SL_Beige_side.png',
                'images/SL_Beige_back.png'
            ]
        },
        colors: [
            {name: 'black', value: '#000000'},
            {name: 'white', value: '#FFFFFF'},
            {name: 'castomRed', value: '#AE192C'},
            {name: 'castomBlue', value: '#4B9BC5'},
            {name: 'castomBrown', value: '#382728'},
            {name: 'castomBeige', value: '#DFC2A4'}
        ]
    },
    {
        id: 22, 
        title: 'Adidas TAEKWONDO', 
        category: 'sport', 
        gender: ['women'],
        isNew: true,
        price: 14990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            white: [
                'images/Adidas_TAEKWONDO.png',
                'images/Taekwondo_front.png',
                'images/Taekwondo_side.png',
                'images/Taekwondo_back.png'
            ],
            black: [
                'images/Adidas_Taekwondo_Black.png',
                'images/Taekwondo_Black_front.png',
                'images/Taekwondo_Black_side.png',
                'images/Taekwondo_Black_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#FFFFFF'},
            {name: 'black', value: '#000000'}
        ]
    },
    {
        id: 23, 
        title: 'Adidas Samba LT', 
        category: 'classic', 
        gender: ['women'], 
        price: 16990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            white: [
                'images/Adidas_Samba_LT.png',
                'images/LT_front.png',
                'images/LT_side.png',
                'images/LT_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#FFFFFF'}
        ]
    },
    {
        id: 24, 
        title: 'Adidas Adizero Adios', 
        category: 'sport', 
        gender: ['women'], 
        price: 18990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            castomGrey: [
                'images/Adidas_Adizero_adios.png',
                'images/Adios_front.png',
                'images/Adios_side.png',
                'images/Adios_back.png'
            ]
        },
        colors: [
            {name: 'castomGrey', value: '#A3A3A3'}
        ]
    },
    {
        id: 25, 
        title: 'Adidas Samba Jane', 
        category: 'classic', 
        gender: ['women'], 
        price: 14990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            white: [
                'images/Adidas_Samba_Jane.png',
                'images/Jane_front.png',
                'images/Jane_side.png',
                'images/Jane_back.png'
            ],
            castomBeige: [
                'images/Adidas_Samba_Jane_Beige.png',
                'images/Jane_Beige_front.png',
                'images/Jane_Beige_side.png',
                'images/Jane_Beige_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#FFFFFF'},
            {name: 'castomBeige', value: '#E1E5DF'}
        ]
    },
    {
        id: 26, 
        title: 'Adidas TAEKWONDO MEI', 
        category: 'sport', 
        gender: ['women'], 
        price: 15990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            castomBeige: [
                'images/Adidas_Takewondo_Mei.png',
                'images/Mei_Beige_front.png',
                'images/Mei_Beige_side.png',
                'images/Mei_Beige_back.png'
            ],
            castomGrey: [
                'images/Adidas_Taekwondo_mie_Grey.png',
                'images/Mei_Grey_front.png',
                'images/Mei_Grey_side.png',
                'images/Mei_Grey_back.png'
            ]
        },
        colors: [
            {name: 'castomBeige', value: '#C6B19F'},
            {name: 'castomGrey', value: '#8A8E92'}
        ]
    },
    {
        id: 27, 
        title: 'Adidas Megaride', 
        category: 'sport', 
        gender: ['women'], 
        price: 24990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            white: [
                'images/Adidas_Megaride.png',
                'images/Megaride_front.png',
                'images/Megaride_side.png',
                'images/Megaride_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#FFFFFF'}
        ]
    },
    {
        id: 28, 
        title: 'Adidas ITALIA 70s', 
        category: 'sport', 
        gender: ['women'],
        isNew: true,
        price: 15990, 
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            castomBeige: [
                'images/Adidas_Italia_70s.png',
                'images/Italia_front.png',
                'images/Italia_side.png',
                'images/Italia_back.png'
            ]
        },
        colors: [
            {name: 'castomBeige', value: '#FAF6F0'}
        ]
    },
    {
        id: 29, 
        title: 'Adidas FRONT COURT 2.0 J', 
        category: 'sport', 
        gender: 'kids', 
        price: 4990, 
        sizes: [27, 28, 29, 30, 31, 32, 33, 34, 35],
        images: {
            white: [
                'images/Adidas_Front_Court_II.png',
                'images/Front_front.png',
                'images/Front_side.png',
                'images/Front_back.png'
            ],
            multicolor: [
                'images/Adidas_Front_Court_Red.png',
                'images/Front_Red_front.png',
                'images/Front_Red_side.png',
                'images/Front_Red_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#FFFFFF'},
            {name: 'multicolor', value: 'linear-gradient(90deg, #000000 50%, #BA242C 50%)'}
        ]
    },
    {
        id: 30, 
        title: 'Adidas Superstar LED', 
        category: 'classic', 
        gender: 'kids', 
        price: 6000, 
        sizes: [27, 28, 29, 30, 31, 32, 33, 34, 35],
        images: {
            white: [
                'images/Adidas_Led_Lights_Superstar.png',
                'images/Led_front.png',
                'images/Led_side.png',
                'images/Led_back.png'
            ],
            multicolor: [
                'images/Adidas_Superstar_Led_Black.png',
                'images/Led_Black_front.png',
                'images/Led_Black_side.png',
                'images/Led_Black_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#FFFFFF'},
            {name: 'multicolor', value: 'linear-gradient(90deg, #000000 50%, #FA78D8 50%)'}
        ]
    },
    {
        id: 31, 
        title: 'Adidas Tensaur Hook and Loop', 
        category: 'sport', 
        gender: 'kids',
        isNew: true,
        price: 3550, 
        sizes: [27, 28, 29, 30, 31, 32, 33, 34, 35],
        images: {
            white: [
                'images/Adidas_Tensaur_Hook_Loop.png',
                'images/Hook_front.png',
                'images/Hook_side.png',
                'images/Hook_back.png'
            ],
            multicolor: [
                'images/Adidas_Tensaur_Hook_And_Loop_Blue.png',
                'images/Hook_Blue_front.png',
                'images/Hook_Blue_side.png',
                'images/Hook_Blue_back.png'
            ],
            castomPink: [
                'images/Adidas_Tensaur_Hook_And_Loop_Pink.png',
                'images/Hook_Pink_front.png',
                'images/Hook_Pink_side.png',
                'images/Hook_Pink_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#FFFFFF'},
            {name: 'multicolor', value: 'linear-gradient(-90deg, #F6F6F6 50%, #15589A 50%)'},
            {name: 'castomPink', value: '#EE638D'}
        ]
    },
    {
        id: 32, 
        title: 'Adidas Tensaur Run 3.0 ELC', 
        category: 'sport', 
        gender: 'kids',
        price: 3650, 
        sizes: [27, 28, 29, 30, 31, 32, 33, 34, 35],
        images: {
            castomRed: [
                'images/Adidas_Tensaur_Run.png',
                'images/Run_front.png',
                'images/Run_side.png',
                'images/Run_back.png'
            ]
        },
        colors: [
            {name: 'castomRed', value: '#E42E3D'}
        ]
    },
    {
        id: 33, 
        title: 'Adidas Star Wars Grand Count 2.0', 
        category: 'classic', 
        gender: 'kids', 
        price: 3990, 
        sizes: [27, 28, 29, 30, 31, 32, 33, 34, 35],
        images: {
            white: [
                'images/Adidas_Star_Wars_Grand.png',
                'images/Grand_front.png',
                'images/Grand_side.png',
                'images/Grand_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#FFFFFF'}
        ]
    },
    {
        id: 34, 
        title: 'Adidas Stan Smith', 
        category: 'classic', 
        gender: 'kids', 
        price: 2990, 
        sizes: [27, 28, 29, 30, 31, 32, 33, 34, 35],
        images: {
            white: [
                'images/Adidas_Stan_Smith_CF.png',
                'images/Smith_front.png',
                'images/Smith_side.png',
                'images/Smith_back.png'
            ]
        },
        colors: [
            {name: 'white', value: '#FFFFFF'}
        ]
    },
    {
        id: 35,
        title: 'Adidas DURAMO SL2 BOA K',
        category: 'sport',
        gender: 'kids',
        isNew: true,
        price: 4700,
        sizes: [27, 28, 29, 30, 31, 32, 33, 34, 35],
        images: {
            castomBlue: [
                'images/Adidas_Duramo_SL2_Blue.png',
                'images/Duramo_front.png',
                'images/Duramo_side.png',
                'images/Duramo_back.png'
            ]
        },
        colors: [
            {name: 'castomBlue', value: '#2553AC'}
        ]
    },
    {
        id: 36,
        title: 'Adidas Barricade',
        category: 'sport',
        gender: 'kids',
        price: 4670,
        sizes: [27, 28, 29, 30, 31, 32, 33, 34, 35],
        images: {
            black: [
                'images/Adidas_Barricade_Black.png',
                'images/Barricade_front.png',
                'images/Barricade_side.png',
                'images/Barricade_back.png'
            ]
        },
        colors: [
            {name: 'black', value: '#000000'}
        ]
    },
    {
        id: 37,
        title: 'Adidas Superstar 360',
        category: 'sport',
        gender: 'kids',
        price: 5400,
        sizes: [27, 28, 29, 30, 31, 32, 33, 34, 35],
        images: {
            black: [
                'images/Adidas_Superstar_360_Black.png',
                'images/360_front.png',
                'images/360_side.png',
                'images/360_back.png'
            ],
            castomRed: [
                'images/360_Red.png',
                'images/360_Red_front.png',
                'images/360_Red_back.png',
                'images/360_Red_side.png'
            ]
        },
        colors: [
            {name: 'black', value: '#000000'},
            {name: 'castomRed', value: '#AF0915'}
        ]
    },
    {
        id: 38,
        title: 'Adidas Drop Step Low 2.0',
        category: 'classic',
        gender: ['men', 'women'],
        isNew: true,
        price: 11990,
        sizes: [37, 38, 39, 40, 41, 42, 43],
        images: {
            multicolor: [
                'images/Drop_Beige.png',
                'images/Drop_Beige_front.png',
                'images/Drop_Beige_side.png',
                'images/Drop_Beige_back.png'
            ],
            black: [
                'images/Drop_Black.png',
                'images/Drop_Black_front.png',
                'images/Drop_Black_side.png',
                'images/Drop_Black_back.png'
            ]
        },
        colors: [
            {name: 'multicolor', value: 'linear-gradient(90deg, #C3AC9D 50%, #DDD6CB 50%)'},
            {name: 'black', value: '#000000'}
        ]
    }
];