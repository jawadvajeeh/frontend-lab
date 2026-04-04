import type { ElementType, JSX } from "react";



type WrapperProps<Element extends ElementType = 'a'> = {
	as?: Element
} & React.ComponentPropsWithoutRef<Element>

export const Wrapper = <Element extends ElementType = 'a',>(props:WrapperProps<Element>) => {
	const {as:Comp="a",...rest} = props
	return <Comp {...rest}></Comp>
}


export const Example1 = () => {
	return <>
		<Wrapper as="button" doesNotExists></Wrapper>
		<Wrapper as="button" onClick={(e) => {}}></Wrapper>
		<Wrapper as="a" href=""></Wrapper>
		<Wrapper as={Custom} thisIsReq={true}></Wrapper>
		<Wrapper href=""></Wrapper>
	</>
}


export const Custom = ({thisIsReq}:{thisIsReq:boolean}) => {
	console.log(thisIsReq)
	return <div></div>
}