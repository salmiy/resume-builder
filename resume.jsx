const useState = React.useState;
const useEffect = React.useEffect;
const useContext = React.useContext;
const createContext = React.createContext;
const useRef = React.useRef

const useAutosizeTextArea = (textAreaRef, value) => {
    useEffect(() => {
      if (textAreaRef) {
        textAreaRef.style.height = "0px";
        const scrollHeight = textAreaRef.scrollHeight;
        textAreaRef.style.height = scrollHeight + "px";
      }
    }, [textAreaRef, value]);
};


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
                <button id="open" onClick={() => setCollapsed(false)}>
                    <svg viewBox="0 0 20 20">
                        <path d="M 2 1 L 6 1 C 6.583 1.004 6.997 1.424 7 2 L 7 18 C 6.997 18.594 6.565 19.002 6 19 L 2 19 C 1.412 19.002 1.003 18.588 1 18 L 1 14 C 0.998 13.394 1.337 13.003 2 13 L 18 13 C 18.599 13.002 19.002 13.434 19 14 L 19 18 C 19.001 18.57 18.581 18.996 18 19 L 14 19 C 13.371 19.002 13.002 18.518 13 18 L 13 2 C 13.002 1.436 13.417 0.998 14 1 L 18 1 C 18.564 0.998 19.002 1.418 19 2 L 19 6 C 18.996 6.554 18.553 7.003 18 7 L 2 7 C 1.401 6.997 0.998 6.566 1 6 L 1 2 C 1.003 1.476 1.476 1.004 2 1 Z"></path>
                    </svg>
                </button>
                <button id="back" onClick={() => setShownCat(null)} className={shownCat ? "visible":"hidden"}>
                    <svg viewBox="0 0 24 24">
                        <path d="M 12 2 L 2 12 L 12 22 M 2 12 L 22 12">
                        </path>
                    </svg>
                </button>
                <div className={`title ${shownCat && 'visible'}`}>{ shownCat?.name }</div>
                <button id="close" onClick={onCloseHandler}>
                    <svg viewBox="0 0 24 24">
                        <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001">
                        </path>
                    </svg>
                </button>
            </header>

            { 
                collapsed ||
                <div className="list-wrapper">
                    <ul className="list">
                        {
                            categories.map( (cat, idx) => 
                                <li 
                                    key={idx}
                                    className={shownCat && "hidden" }
                                    onClick={() => setShownCat(cat)}
                                    style={{'--delay': `${idx * .08 + .3}s`}}
                                >
                                    <span>{ cat.name }</span>
                                    <div></div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            }
            <div id="content" className={shownCat?"visible":""}>
                <div className="main">
                    { shownCat && shownCat.form }
                </div>
            </div>

        </div>
    )
}
function ContactInfo() {
    const [name, setName] = useState("Youssef Salmi")
    const [email, setEmail] = useState("salmi19971@gmail.com")
    const [phone, setPhone] = useState("06 73 18 00 12")
    const [links, setLinks] = useState([])


    function onEnabledChange(state) {
        console.log(`Enabled? ${state?"Yes":"No"}`)
    }
    
    /**
     * icon
     * name
     * userID
     * link
     */

    return (
        <div className="contact-info column text-222">
            <div className="row justify-between p-1rem align-center">
                <span className="fs-12">Enabled</span>
                <Switcher onChange={onEnabledChange} initial={true} /> 
            </div>
            <RoundImageInput className="self-center" />
            <input className="mb-2" type="text" name="fullname" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}/>
            <input className="mb-2" type="text" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input className="mb-3" type="text" name="phone" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)}/>
            <form id="contact-info-links-form">
                <h3 className="mb-3 fs-13">Social Links</h3>
                <div className="first-row row gap-1">
                    <RoundImageInput className="s-2 rounded-05" imgClassName="rounded-05" />
                    <input type="text" placeholder="Name" max="30" />
                    <input type="text" placeholder="User Id" />
                </div>
                <div className="row gap-1">
                    <input type="text" placeholder="URL" />
                    <button>add</button>
                </div>
            </form>
            <div id="contact-info-links" className="column gap-3">
                <div className="row gap-2 align-start">
                    <img className="h-2 w-2 rounded-05 shadow" src="https://i.pinimg.com/736x/93/fd/a4/93fda4257dbfd4412650d51641172782.jpg" />
                    <div className="column gap-1">
                        <span>Facebook</span>
                        <span>@jst.jsph</span>
                        <span>https://www.facebook.com/profile?user=jst.jsph</span>
                    </div>
                    <button className="delete-link self-center">
                        <svg fill="red" width="1.5rem" viewBox="0 0 24 24">
                            <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"/>
                        </svg>
                    </button>
                </div>
                <div className="row gap-2 align-start">
                    <img className="h-2 w-2 rounded-05 shadow" src="https://i.pinimg.com/736x/93/fd/a4/93fda4257dbfd4412650d51641172782.jpg" />
                    <div className="column gap-1">
                        <span>Facebook</span>
                        <span>@jst.jsph</span>
                        <span>https://www.facebook.com/profile?user=jst.jsph</span>
                    </div>
                    <button className="delete-link self-center">
                        <svg fill="red" width="1.5rem" viewBox="0 0 24 24">
                            <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
function Summary() {
    const [summary, setSummary] = useState("")
    const taRef = useRef(null)

    useAutosizeTextArea(taRef.current, summary)

    return (
        <div className="column text-222">
            <div className="row justify-between p-1rem align-center">
                <span className="fs-12">Enabled</span>
                <Switcher onChange={() => {}} initial={true} /> 
            </div>
            <textarea 
                className="mb-1" 
                placeholder="Summary goes here"
                ref={taRef}
                value={summary}
                onChange={e => setSummary(e.target.value)}></textarea>
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






const Switcher = (props) => {
    const [isChecked, setIsChecked] = useState(props?.initial || false)
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked)
      props?.onChange(!isChecked)
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

const RoundImageInput = (props) => {
    const [image, setImage] = useState("https://eteflonline.com/wp-content/plugins/ld-dashboard/public/img/img_avatar.png")

    function onPictureChange(e) {
        const file = e.target?.files[0]
        if (!file) return

        const url = URL.createObjectURL(file);
        setImage(url);
        props.onChange(url)
    }

    return (
        <label className={`round-img-input ${props.className}`}>
            <input type="file" accept="image/*" onChange={onPictureChange} class="hidden" />
            <img className={props.imgClassName} src={image} />
        </label>
    )
}

  

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<Root />);
