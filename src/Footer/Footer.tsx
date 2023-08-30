import "./Footer.css";

function Footer() {
    return (
        <footer>
            <div className="wrapper">
                <div className="footer-block">
                    <h2>Usefull links</h2>
                    <a href="https://fictadvisor.com/">Fict advisor</a>
                    <a href="https://www.instagram.com/sr_fiot/">Fice instargram</a>
                </div>
                <div className="footer-block">
                    <h2>Contacts</h2>
                    <span>Obolonska St, 34, Kyiv, 04071</span>
                    <span>+380(50)123-45-67</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
