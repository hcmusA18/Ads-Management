function addAdvertisementSource(map) {
  map.loadImage(
    'assets/blue_elip.png',
    (error, image) => {
      if (error) throw error;
      map.addImage('quang-cao', image);
      // Add a GeoJSON source with 2 points
      map.addSource('diem-dat', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              // feature for Mapbox DC
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [106.694444, 10.782402]
              },
              'properties': {
                'title': 'Đại học Kiến trúc TP.HCM'
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'title': 'Dinh Độc Lập',
                'description': 'Là Dinh Độc Lập'
              },
              'geometry': {
                'coordinates': [106.695316, 10.776984],
                'type': 'Point'
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'title': 'Hồ Con rùa',
                'description': 'Hồ Con rùa'
              },
              'geometry': {
                'coordinates': [106.695917, 10.782689],
                'type': 'Point'
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'title': 'Công viên Tao Đàn',
                'description': 'Công viên Tao Đàn'
              },
              'geometry': {
                'coordinates': [106.691357, 10.772957],
                'type': 'Point'
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'title': 'Nhà Văn hoá Thanh niên',
                'description': 'Nhà Văn hoá Thanh niên'
              },
              'geometry': {
                'coordinates': [106.697551, 10.78163],
                'type': 'Point'
              }
            }
          ]
        }
      });

      // Add a symbol layer
      map.addLayer({
        'id': 'quang-cao',
        'type': 'symbol',
        'source': 'diem-dat',
        'layout': {
          'icon-image': 'quang-cao',
          'icon-size': 0.5,
          // get the title name from the source's "title" property
          'text-field': ['get', 'title'],
          'text-font': [
            'Montserrat SemiBold',
            'Arial Unicode MS Bold'
          ],
          // 'text-offset': [0, 1.25],
          'text-anchor': 'top',
          'icon-anchor': 'bottom'
        }
      });
    }
  );
}

function addReportSource(map) {
  map.loadImage(
    'assets/red_elip.png',
    (error, image) => {
      if (error) throw error;
      map.addImage('bao-cao', image);
      map.addSource('diem-bao-cao', {
        type: 'geojson',
        data: {
          'type': 'FeatureCollection',
          'features': [
            {
              // feature for Mapbox SF
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [106.694863, 10.783003]
              },
              'properties': {
                'title': 'Đại học Kinh tế TP.HCM'
              }
            },
          ]
        }
      });

      // Add a symbol layer
      map.addLayer({
        'id': 'bao-cao',
        'type': 'symbol',
        'source': 'diem-bao-cao',
        'layout': {
          'icon-image': 'bao-cao',
          'icon-size': 0.5,
          // get the title name from the source's "title" property
          'text-field': ['get', 'title'],
          'text-font': [
            'Montserrat SemiBold',
            'Arial Unicode MS Bold'
          ],
          // 'text-offset': [0, 1.25],
          'text-anchor': 'top',
          'icon-anchor': 'bottom'
        }
      });
    }
  );
}

function addSource(map) {
  addAdvertisementSource(map);
  addReportSource(map);
}
