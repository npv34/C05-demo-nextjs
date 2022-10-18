import Header from "./Header"

// @ts-ignore
const Layout = ({children}) => {
    return (
        <>
            <Header/>
            {children}
        </>
    )
}

export default Layout
