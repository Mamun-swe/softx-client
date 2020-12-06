import React from 'react'

const Index = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card border-0 shadow" style={styles.card}>
                            <div className="flex-center flex-column">
                                <h5 className="mb-0">200</h5>
                                <p className="mb-0">Books</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card border-0 shadow" style={styles.card}>
                            <div className="flex-center flex-column">
                                <h5 className="mb-0">200</h5>
                                <p className="mb-0">Students</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Index;


const styles = {
    card: {
        height: 150
    }
}