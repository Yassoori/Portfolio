import {Routes, Route} from 'react-router-dom'

// Import Pages
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import UX from './pages/UX'
import Art from './pages/Art'
import Photography from './pages/Photography'

// import Components
import Product from './components/Product'
import Project from './components/Project'
// import PhotoTypes from './components/PhotoTypes'

// import UXProjects
import RealBurger from './UXProjects/RealBurger'
import Aurea from './UXProjects/Aurea'
import ReganHillMale from './UXProjects/ReganHillMale'
import Pokedex from './UXProjects/Pokedex'

// import PhotoTypes
import Weddings from './PhotoTypes/Weddings'
import Graduations from './PhotoTypes/Graduations'
import Events from './PhotoTypes/Events'
import Portraits from './PhotoTypes/Portraits'

const Links = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/ux-projects' element={<UX/>}/>
        <Route path='/photography' element={<Photography/>}/>
        <Route path='/art' element={<Art/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        {/* UXProjects */}
        <Route path="/ux-projects/:id" element={<Project/>}/>
        <Route path="/ux-projects/realburger" element={<RealBurger/>}/>
        <Route path="/ux-projects/aurea" element={<Aurea/>}/>
        <Route path="/ux-projects/regan-hill-male" element={<ReganHillMale/>}/>
        <Route path="/ux-projects/pokedex" element={<Pokedex/>}/>
        {/* PhotoTypes */}
        {/* <Route path="/photography/:id" element={<PhotoTypes/>}/> */}
        <Route path='/photography/weddings' element={<Weddings/>}/>
        <Route path='/photography/graduations' element={<Graduations/>}/>
        <Route path='/photography/events' element={<Events/>}/>
        <Route path='/photography/portraits' element={<Portraits/>}/>
    </Routes>
  )
}

export default Links