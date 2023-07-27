import { styled } from "styled-components";

const StyledText = styled.p`
    font-size: ${props=> props.size};
    font-weight:  ${props=> props.weight};
    color:  ${props=> props.color};
    font-family:  ${props=> props.fontfam};
    padding: 0;
    margin: 0;

`
export const TextFormat = ({children,size,weight,color,fontfam}) => {
    return <StyledText  size={size} weight={weight} color={color} fontfam={fontfam}>
        {children}
    </StyledText>
}