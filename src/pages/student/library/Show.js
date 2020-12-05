import React, { useState, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import NavBar from '../../../components/student/Navbar/Index'

import Logo from '../../../assets/static/node.jpg'

const Show = () => {
    const contentBox = useRef()
    const [isLoading, setLoading] = useState(false)


    if (isLoading) {
        return (
            <div>
                <NavBar />
                <div className="container py-3 py-lg-5">
                    <div className="row">
                        <div className="col-12 col-lg-5 text-center">
                            <Skeleton animation={true} count={1} width={200} height={250} />
                        </div>

                        <div className="col-12 col-lg-7 py-3 py-lg-0" ref={contentBox}>
                            <Skeleton animation={true} count={1} width={contentBox.width} height={30} />

                            <div className="pt-3">
                                <Skeleton animation={true} count={1} width={contentBox.width} height={20} />
                                <br />
                                <Skeleton animation={true} count={1} width={contentBox.width} height={20} />
                                <br />
                                <Skeleton animation={true} count={1} width={contentBox.width} height={20} />
                                <br />
                                <Skeleton animation={true} count={1} width={contentBox.width} height={20} />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="show-book">
            <NavBar />

            <div className="container py-3 py-lg-5">
                <div className="row">
                    <div className="col-12 col-lg-5 text-center">
                        <img src={Logo} className="img-fluid" alt="..." />
                    </div>

                    <div className="col-12 col-lg-7 py-3 py-lg-0">
                        <h4>gggggg</h4>
                        <p style={styles.text}>This is</p>
                        <p style={styles.text}>This is</p>
                        <p style={styles.text}>This is</p>
                        <p style={styles.text}>This is</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Show;

const styles = {
    text: {
        fontSize: 15,
        marginBottom: 5
    }
}