import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function KymnevoistlusMenu() {
    const { i18n, t } = useTranslation();
    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'et' ? 'en' : 'et');
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">{t("Kümnevõistlus")}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/athletes">{t("Sportlased")}</Nav.Link>
                        <Nav.Link as={Link} to="/events">{t("Võistlusalad")}</Nav.Link>
                        <Nav.Link as={Link} to="/results">{t("Tulemused")}</Nav.Link>
                        <Nav.Link as={Link} to="/map">{t("Kaart")}</Nav.Link>
                    </Nav>
                    <button onClick={toggleLang} style={{ marginLeft: 'auto' }}>
                        {i18n.language === 'et' ? 'EN' : 'ET'}
                    </button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default KymnevoistlusMenu;