import React, { Component, useEffect, useState } from 'react';
import { Drawer, Button, Layout, Menu, Grid, Image } from 'antd';
import {AlignRightOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom';
import logo from "../../assets/convinLogo.png"
import "../../styles/Navbar.css";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [currentSize, setCurrentSize] = useState("");
    const screens = useBreakpoint();

    useEffect(() => {
        for (let each of Object.keys(screens)) {
            if (screens[each]) {
                setCurrentSize(each)
            }
        }
    }, [screens])
    
    return (
        <Header
            style={{
            position: 'sticky',
            justifyContent: "space-between",
            top: 0,
            zIndex: 1,
            width: '100%',
            // background: "linear-gradient(0deg, #0466a3aa 0%, #000965 100%)",
            background: "#045557dd",
            backdropFilter: "blur(15px)"
            }}
        >
            {/* <span style={{color: "white"}}> */}
                <img src={logo} style={{width: "120px", height: "fit-content"}} />
                
            {/* </span> */}
            {(currentSize === "sm" || currentSize === "xs") ?
                <>
                    <Button style={{float: "right", marginTop: "10px"}} onClick={() => setOpen(true)}>
                        <AlignRightOutlined />
                    </Button>
                    <Drawer placement="right" onClose={() => setOpen(false)} open={open} className="mobile-navbar">
                        <p style={{fontSize: "16px"}}>
                            <Link to="/">
                                Dashboard
                            </Link>
                        </p>
                        <p style={{fontSize: "16px"}}>
                            <Link to="/buckets">
                                Buckets
                            </Link>
                        </p>
                        <span style={{fontSize: "16px"}}>
                            <Link to="/history">
                                History
                            </Link>
                        </span>
                    </Drawer>
                </>
                :
                <div style={{
                    display: "flex",
                    float: "right",
                    gap: "30px"
                }} className="desktop-navbar">
                    <span style={{color: "white !important", fontSize: "16px"}}>
                        <Link to="/">
                            Dashboard
                        </Link>
                    </span>
                    <span style={{color: "white !important", fontSize: "16px"}}>
                        <Link to="/buckets">
                            Buckets
                        </Link>
                    </span>
                    <span style={{color: "white !important", fontSize: "16px"}}>
                        <Link to="/history">
                            History
                        </Link>
                    </span>
                </div>
            }
        </Header>
    );
}
export default Navbar;