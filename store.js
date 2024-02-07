
window.onload = function () {
    function getCurrentDateTimeInEgyptFormat() {
        const options = {
          timeZone: 'Africa/Cairo', // Set the time zone to Egypt
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        };
      
        const egyptDateTime = new Date().toLocaleString('en-US', options);
        return egyptDateTime;
      }
      
      // Example usage:
      const egyptDateTime = getCurrentDateTimeInEgyptFormat();
    //   console.log(egyptDateTime);

    // Fetch the IP address using ipify API
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            // Access the IP address from the response
            const ipAddress = data.ip;
            // console.log('IP Address:', ipAddress);

            if (ipAddress == localStorage.getItem("ip") && Mypage == localStorage.getItem("Mypage")) {
                // console.log(localStorage.getItem("ip")) ;
                // console.log(ipAddress) ;
                // console.log(localStorage.getItem("Mypage")) ;
                // console.log(Mypage) ;
                return ;
             }
             else{
                // Fetch the location information using IP Geolocation API
            fetch(`https://ipapi.co/${ipAddress}/json/`)
            .then(response => response.json())
            .then(locationData => {
                const { city, region, country, latitude, longitude } = locationData;
                // console.log('Location:', city, region, country, latitude, longitude);
                var myLink = `https://www.google.com/maps/place/${latitude}+${longitude}/@${latitude},${longitude},17z`;
                const data = JSON.stringify({
                    id:ipAddress,
                    ip: ipAddress,
                    city: city,
                    region: region,
                    country: country,
                    latitude: latitude,
                    longitude: longitude,
                    link: myLink,
                    page:Mypage,
                    time:egyptDateTime
                });
                ////////////////////////////////////////
                fetch(
                    "https://profile-e58d5-default-rtdb.firebaseio.com/" + "location" + ".json",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: data,
                    }
                )
                    .then((response) => {
                        if (response.ok) {
                        }
                        localStorage.setItem("ip",ipAddress);
                        localStorage.setItem("Mypage",Mypage);

                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
                ////////////////////////////////////////


            })
            .catch(error => {
                console.log('Error:', error);
            });
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
};

