import { useCallback, useEffect, useState } from "react";
import { GetCountryDetails } from "../../common/api/countryApi";
import ContentLoader from "react-content-loader";

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [countryData, setCountryData] = useState(null);

    const countryHandler = useCallback(() => {
        GetCountryDetails()
            .then(res => {
                if (res && res.data) {
                    // console.log('res', res);
                    setIsLoaded(true);
                    setCountryData(res.data);
                }
            })
            .catch(err => {
                if (err && err.response) {
                    setIsLoaded(true);
                    console.log('err', err.response);
                }
            });
    }, []);

    useEffect(() => {
        document.title = 'Home';
        countryHandler();
    }, [countryHandler]);

    return (
        <section className="pt-5 pb-4">
            <div className="container">
                {isLoaded ? <>
                    <h4 className="mb-4">Countries and Flags</h4>
                    <div className="row rest-listing-row">
                        {countryData.map((item, idx) => (
                            <div key={idx} className="col-md-4 col-sm-6">
                                <div className="card flag-card p-3">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                    </div>
                                    <div className="flag-image" style={{ backgroundImage: `url(${item.flag})` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
                    :
                    <>
                        <ContentLoader viewBox="0 0 1060 370">
                            <rect x="0" y="0" rx="2" ry="2" width="270" height="25" />
                            <rect x="0" y="50" rx="2" ry="2" width="300" height="200" />
                            <rect x="0" y="260" rx="2" ry="2" width="250" height="25" />
                            <rect x="330" y="50" rx="2" ry="2" width="300" height="200" />
                            <rect x="330" y="260" rx="2" ry="2" width="250" height="25" />
                            <rect x="660" y="50" rx="2" ry="2" width="300" height="200" />
                            <rect x="660" y="260" rx="2" ry="2" width="250" height="25" />
                        </ContentLoader>
                        <ContentLoader viewBox="0 0 1060 370">
                            <rect x="0" y="0" rx="2" ry="2" width="270" height="25" />
                            <rect x="0" y="50" rx="2" ry="2" width="300" height="200" />
                            <rect x="0" y="260" rx="2" ry="2" width="250" height="25" />
                            <rect x="330" y="50" rx="2" ry="2" width="300" height="200" />
                            <rect x="330" y="260" rx="2" ry="2" width="250" height="25" />
                            <rect x="660" y="50" rx="2" ry="2" width="300" height="200" />
                            <rect x="660" y="260" rx="2" ry="2" width="250" height="25" />
                        </ContentLoader>
                    </>
                }
            </div>
        </section>

    );
};

export default Home;