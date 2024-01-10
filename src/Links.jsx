import {Routes, Route} from 'react-router-dom'
// Import Pages
import Home from './pages/Home'
import About from './pages/About'
// import Contact from './pages/Contact'
import UX from './pages/UX'
import Art from './pages/Art'
// import Photography from './pages/Photography'

// import Components
import Product from './components/Product'
import Project from './components/Project'

// import UXProducts
// import RealBurger from './UXProjects/RealBurger'
import Aurea from './UXProjects/Aurea'
// import ReganHillMale from './UXProjects/ReganHillMale'
// import Pokedex from './UXProjects/Pokedex'

const Links = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        {/* <Route path='/contact' element={<Contact/>}/> */}
        <Route path='/ux-projects' element={<UX/>}/>
        <Route path='/art' element={<Art/>}/>
        {/* <Route path='/photography' element={<Photography/>}/> */}
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/ux-projects/:id" element={<Project/>}/>
        {/* <Route path="/ux-projects/RealBurger" element={<RealBurger/>}/> */}
        <Route path="/ux-projects/Aurea" element={<Aurea/>}/>
        {/* <Route path="/ux-projects/ReganHillMale" element={<ReganHillMale/>}/> */}
        {/* <Route path="/ux-projects/Pokedex" element={<Pokedex/>}/> */}
    </Routes>
  )
}

export default Links