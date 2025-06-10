import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Menu() {
    const { t, i18n } = useTranslation();

    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">{t('nav.brand-name')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/cart">{t('nav.cart')}</Nav.Link>
                        <Nav.Link as={Link} to="/orders">{t('nav.orders')}</Nav.Link>
                        <Nav.Link as={Link} to="/map">{t('nav.map')}</Nav.Link>
                        <NavDropdown title="Manage" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/admin/products">{t('nav.manage-products')}</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/categories">
                                Manage Categories
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/arrays">
                                Arrays
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <button onClick={() => i18n.changeLanguage("et")}>Eesti</button>
                        <button onClick={() => i18n.changeLanguage("en")}>English</button>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;