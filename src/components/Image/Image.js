function Image({ className, src, alt, comp }) {
    return (
        <>
        {/* Nếu image là file svg thì truyền prop là comp. Ví dụ: comp={<SVG />} */}
        {/* Còn lài các file khác là .png, .jpg thì truyền bắt buộc phải truyền 2 prop là src và alt */}
            { 
                src && alt ? (
                    <img 
                        src={src} 
                        alt={alt}
                    />
                ) : comp && ( comp )
            }
        </>
    )
}

export default Image;