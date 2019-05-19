import { AppBar, IconButton, Toolbar } from "@material-ui/core"
import { Fade } from "react-reveal"
import { Reset } from "styled-reset"
import styled, { createGlobalStyle } from "styled-components"
import CellphoneIcon from "mdi-react/CellphoneIcon"
import EmailOutlineIcon from "mdi-react/EmailOutlineIcon"
import LoginVariantIcon from "mdi-react/LoginVariantIcon"

import React, { useEffect, useRef, useState } from "react"

import background from "../assets/background.jpg"
import coffee from "../assets/coffee.jpg"
import logo from "../assets/intellinet.svg"
import logos from "../assets/logos.jpg"
import onScroll from "../helpers/onScroll"
import plan from "../assets/plan.jpg"

const Global = createGlobalStyle`
  body {
    font-family: Montserrat;
    line-height: 1.5;
    font-size: 1.75vmin;
  }

  @media screen and (orientation: portrait), screen and (max-width: 600px) {
    body {
      font-size: 3.25vw;
    }
  }

  h1 {
    font-size: 2em;
    font-weight: 600;
    margin-bottom: 0.5em;
  }

  input {
    border: 3px solid #CFD8DC;
    box-sizing: border-box;
    font: inherit;
    width: 80%;
    display: block;
    margin: 0.5em auto;
    padding: 0.75em 1.25em;
  }

  blockquote {
    font-size: 0.875em; 
  }

  button {
    background: #00BFA5;
    border: none;
    color: #FFF;
    font: inherit;
    font-weight: bold;
    font-size: 0.875em;
    margin: 1em 0;
    padding: 1em 3em;
    text-transform: uppercase;
  }
  
  cite {
    display: block;
    font-weight: bold;
    margin-top: 1em;
  }

  p {
    font-size: 1.125em;
    margin-bottom: 2rem;
  }
`

export default () => {
  const scroller = useRef<HTMLDivElement>();
  const sections = useRef<HTMLDivElement[]>([]);
  const header = useRef<HTMLDivElement>();
  const shadeElement = useRef<HTMLDivElement>();

  const [color, setColor] = useState("#FFF");
  const [showHeader, setShowHeader] = useState(false);
  const showingHeader = useRef<boolean>(false);
  showingHeader.current = showHeader;


  useEffect(() => {
    onScroll(scroller.current, () => {
      const y = scroller.current.scrollTop;
      shadeElement.current.style.opacity = Math.min(1, 0.5 + 0.5 * (y / window.innerHeight)).toFixed(3)

      const windowHeight = window.innerHeight;
      const currentSection = sections.current.find(
        (section: HTMLDivElement) => 
          ((section.offsetTop - section.offsetHeight * 0.5) < y) 
          && ((section.offsetTop + section.offsetHeight * 0.5) > y)
      )

      const hasSection = !!currentSection;
      if (showingHeader.current !== hasSection) {
        setShowHeader(hasSection);
      }

      if (currentSection && currentSection.style.borderColor !== color) {
        setColor(currentSection.style.borderColor);
      }
    })
  }, []);

  return (
    <>
      <AppBar position="fixed" style={{ 
        backgroundColor: color,
        opacity: showHeader ? 1 : 0,
        transition: "500ms opacity, 500ms background-color",
      }}>
        <Toolbar style={{ paddingRight: 0 }}>
          <div style={{ flex: "1 0", height: "36px" }}>
            <img src={logo} style={{ height: "36px", width: "auto" }} />
          </div>
          <MenuButton href="tel:0390129513">
            <CellphoneIcon color="#FFF" />
          </MenuButton>
          <MenuButton href="#contact">
            <EmailOutlineIcon color="#FFF" />
          </MenuButton>
          <MenuButton href="http://intellinet.solutions" style={{ background: "rgba(255,255,255,0.1)" }}>
            <LoginVariantIcon color="#FFF" />
          </MenuButton>
        </Toolbar>
      </AppBar>

      <App ref={scroller}>
        <Global />
        <Reset />

        <Feature>
          <Background src={background} />
          <Foreground>
            <LogoImage src={logo} />
            <Shade ref={shadeElement} />
          </Foreground>
        </Feature>

        <BusinessSection
          ref={(element: HTMLDivElement) => sections.current[0] = element}
        >
          <Content>
            <Fade bottom>
              <h1>Less downtime. More business.</h1>
              <p>
                We help businesses implement a properly managed IT structure. One with
                redundancy, reliability, security and resilience.
              </p>
            </Fade>
          </Content>
        </BusinessSection>

        <SaveSection
          className="text-left"
          ref={(element: HTMLDivElement) => sections.current[1] = element}
        >
          <Content>
            <Fade bottom>
              <h1>Save money by  doing it right.</h1>
              <p>
                We work with you to identify and mitigate risks, protecting you
                from loss of work and unnecessary liability.
              </p>
            </Fade>
          </Content>
        </SaveSection>

        <TrustSection
          className="text-right"
          ref={(element: HTMLDivElement) => sections.current[2] = element}
          style={{ 
          }}
        >
          <Content>
            <Fade bottom>
              <h1>Trusted, supported, local.</h1>
              <p>We maintain a strong relationship with all of our clients and suppliers.</p>
              <blockquote>
                "Intellinet have been supporting us for years. The more we engage
                them, the more we find ourselves running effectively and efficiently.
                Morale is high, and money is flowing into the business again thanks to
                them."
                <cite>- Stanko Peric</cite>
              </blockquote>
            </Fade>
          </Content>
        </TrustSection>

        <Section
          ref={(element: HTMLDivElement) => sections.current[3] = element}
          id="contact"
          style={{ 
            alignItems: "center",
            borderColor: "#00BFA5",
            justifyContent: "center",
          }}
        >
          <Content style={{ maxWidth: "24em" }}>
            <Fade bottom>
              <h1>Get going.</h1>
              <p>Reach out to us below and get your business doing more of what it does best.</p>
              <input placeholder="Your name" />
              <input placeholder="Your company" />
              <input placeholder="Your phone or email" />
              <button>Send!</button>
            </Fade>
          </Content>
        </Section>
      </App>
    </>
  )
}

const Content = styled.div`
  max-width: 600px;
`

const Section = styled.div`
  background: #FFF no-repeat 50% 50%;
  background-size: cover;
  border-top: 0.5em solid;
  box-sizing: border-box;
  display: flex;
  height: calc(100vh - 40px);
  padding: 16vmin 16vmin;
  position: relative;
  text-align: center;
  transform-style: preserve-3d;
  transition: transform 0.5s;

  &.text-left {
    text-align: left;
  }

  &.text-right {
    text-align: right;
  }

  @media screen and (orientation: portrait), screen and (max-width: 600px) {
    height: 40em;
    min-height: 100vh;
  }
`

const Shade = styled.div`
  transition: opacity 0.1s;
  transform: translateZ(0);
  background: #263238;
  opacity: 0.5;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
`

const App = styled.div`
  font-family: Montserrat; 
  overflow-x: hidden;
  overflow-y: auto;
  perspective: 300px;
  height: 100vh;
`

const MenuButton = styled<any>(IconButton)`
  && {
    border-radius: 0;
    padding: 20px 12px;
  }
`

const Feature = styled(Section)`
  background: none;
  border: 0;
  height: 100vh;

  @media screen and (orientation: portrait), screen and (max-width: 600px) {
    height: 100vh;
  }
`

const Foreground = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  transform: translateZ(0);
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
`

const BusinessSection = styled(Section)`
  border-color: #FF5252;
  align-items: center;
  background-image: url(${coffee});
  justify-content: center;
  transform: translateZ(0);
`

const SaveSection = styled(Section)`
  align-items: flex-start;
  background-image: url(${plan});
  border-color: #448AFF;
  color: #FFF;
  justify-content: flex-end;

  ${Content} {
    max-width: 24vw;
    width: 22em;
  }

  @media screen and (orientation: portrait), screen and (max-width: 600px) {
    background-position: 100% 0;

    ${Content} {
      max-width: none;
      width: auto;
      text-align: center;
    }
  }
`

const TrustSection = styled(Section)`
  align-items: flex-start;
  background-image: url(${logos});
  background-position: calc(20vw + 16em) 50%;
  background-size: cover;
  border-color: #6200EA;
  justify-content: flex-start;

  ${Content} {
    width: 16em;
  }

  @media screen and (orientation: portrait), screen and (max-width: 600px) {
    align-items: center;
    background-position: 50% 50%;

    ${Content} {
      text-align: center;
      width: auto;
    }
  }
`

const Background = styled.img`
  height: 100vh;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  transform: translateZ(-300px) scale(2);
  width: 100vw;
  z-index: 3;
`

const LogoImage = styled.img`
  height: auto;
  max-width: 50%;
  position: relative;
  z-index: 3;
  width: 30vmin;

  @media screen and (orientation: portrait), screen and (max-width: 600px) {
    width: 60vw;
  }

`
