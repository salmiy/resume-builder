const useState = React.useState;
const useEffect = React.useEffect;
const useContext = React.useContext;
const createContext = React.createContext;


const initialData = {
    contactInfo: {},
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    hobbies: []
}

const SectionsContext = createContext();

function Root() {
    const [sections, setSections] = useState({})

    return (
        <>
            <SectionsContext.Provider value={sections}>
                <Content />
            </SectionsContext.Provider>
            <Control />
        </>
    )
}


// control here
function Control() {
    const [collapsed, setCollapsed] = useState(false);
    const [shownCat, setShownCat] = useState(null)

    const categories = [
        {
            name: "Contact Info",
            top: -12.25,
            form: <ContactInfo />
        },
        {
            name: "Summary",
            top: -16.25,
            form: <Summary />
        },
        {
            name: "Experience",
            top: -20.25,
            form: <ContactInfo />
        },
        {
            name: "Education",
            top: -24.25,
            form: <ContactInfo />
        },
        {
            name: "Skills",
            top: -28.25,
            form: <ContactInfo />
        },
    ]


    function onCloseHandler() {
        setCollapsed(true)
        setShownCat(null)
    }

    return ( 
        <div id="control" className={collapsed ? 'collapsed' : ''} >
            <header>
                <button id="back" onClick={() => setShownCat(null)} className={shownCat ? "visible":"hidden"}>
                    <svg viewBox="0 0 24 24">
                        <path d="M 12 2 L 2 12 L 12 22 M 2 12 L 22 12">
                        </path>
                    </svg>
                </button>
                <button id="open" onClick={() => setCollapsed(true)}>
                    <svg viewBox="0 0 20 20">
                        <path d="M 2 1 L 6 1 C 6.583 1.004 6.997 1.424 7 2 L 7 18 C 6.997 18.594 6.565 19.002 6 19 L 2 19 C 1.412 19.002 1.003 18.588 1 18 L 1 14 C 0.998 13.394 1.337 13.003 2 13 L 18 13 C 18.599 13.002 19.002 13.434 19 14 L 19 18 C 19.001 18.57 18.581 18.996 18 19 L 14 19 C 13.371 19.002 13.002 18.518 13 18 L 13 2 C 13.002 1.436 13.417 0.998 14 1 L 18 1 C 18.564 0.998 19.002 1.418 19 2 L 19 6 C 18.996 6.554 18.553 7.003 18 7 L 2 7 C 1.401 6.997 0.998 6.566 1 6 L 1 2 C 1.003 1.476 1.476 1.004 2 1 Z"></path>
                    </svg>
                </button>
                <button id="close" onClick={onCloseHandler}>
                    <svg viewBox="0 0 24 24">
                        <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001">
                        </path>
                    </svg>
                </button>
            </header>

            { 
                collapsed || 
                <ul className="list">
                    {
                        categories.map( (cat, idx) => 
                            <li 
                                key={idx}
                                className={shownCat ? shownCat.name != cat.name ? "hidden":"visible":"" }
                                style={shownCat && shownCat.name == cat.name?{top: `${cat.top}rem`}:{}}
                                onClick={() => setShownCat(cat)}
                            >
                                <span>{ cat.name }</span>
                                <div></div>
                            </li>
                        )
                    }
                </ul>
            }
            <div id="content" className={shownCat?"visible":""}>
                { shownCat && shownCat.form }
            </div>

        </div>
    )
}
function ContactInfo() {

    const [name, setName] = useState("Youssef Salmi")
    const [email, setEmail] = useState("salmi19971@gmail.com")
    const [phone, setPhone] = useState("06 73 18 00 12")

    return (
        <div className="contactInfo column text-222">
            <div className="row justify-between p-1rem align-center">
                <span className="fs-12">Enabled</span>
                <Switcher />
            </div>
            <input className="mb-1" type="text" name="fullname" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}/>
            <input className="mb-1" type="text" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input className="mb-1" type="text" name="phone" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)}/>
        </div>
    )
}
function Summary() {

    const [summary, setSummary] = useState("")

    return (
        <div className="contactInfo column">
            <input className="mb-1" type="text" name="fullname" placeholder="Summary goes here" value={summary} onChange={e => setSummary(e.target.value)}/>
        </div>
    )
}





// Templates here
function Content() {

    return (
        <>
            <div className="me">me</div>
            <div className="row content">
                <div className="column side">side</div>
                <main className="column main" onClick={() => setShow(!show)}>main</main>
            </div>
        </>
    )
}






const Switcher = () => {
    const [isChecked, setIsChecked] = useState(false)
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked)
    }
  
    return (
        <label className='row pointer select-none align-center'>
          <div className='relative'>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={handleCheckboxChange}
              className='peer sr-only'
            />
            <div className='block h-8 w-14 rounded-full' ></div>
            <div className='dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition' ></div>
          </div>
        </label>
    )
}

  

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<Root />);
