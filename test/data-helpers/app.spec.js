import { expect } from 'chai';
import DATA_HELPERS from '../../data-helpers/app';
import STUB_DATA from '../../stubs/checkInTester';

describe('Checkin Helper Functions', function() {
	describe('Venues', function() {
		it('aggregates categories with counts', function() {
			const tester = DATA_HELPERS.getCategoryCount(STUB_DATA.response.checkins.items);
			expect(tester['Portuguese Restaurant'].count).to.equal(2);
		});
		it('totals all venues', function() {
			const tester = DATA_HELPERS.getCategoryCount(STUB_DATA.response.checkins.items);
			let venueCount = tester['Portuguese Restaurant'].count + tester['Cocktail Bar'].count
			expect(venueCount).to.equal(3);
		});
	});	
	describe('Geojson', function() {
		it('contains the appropriate type header', function() {
			const tester = DATA_HELPERS.getGeojson(STUB_DATA.response.checkins.items);
			expect(tester['type']).to.equal('FeatureCollection');
		});
		it('features are contained in an array', function() {
			const tester = DATA_HELPERS.getGeojson(STUB_DATA.response.checkins.items);
			expect(tester['features']).to.be.an('array');
		});
		describe('geometry', function() {
			it('each feature has a geometry type', function() {
				const tester = DATA_HELPERS.getGeojson(STUB_DATA.response.checkins.items);
				let featurePoints = true;
				tester['features'].forEach((feature) => {
					if (!feature.geometry.type) {
						featurePoints = feature;
					}
				});
				expect(featurePoints).to.equal(true);
			});
			it('each feature has a coordinates array', function() {
				const tester = DATA_HELPERS.getGeojson(STUB_DATA.response.checkins.items);
				let featureCoords = true;
				tester['features'].forEach((feature) => {
					if (feature.geometry.coordinates.length !== 2) {
						featureCoords = feature;
					}
				});
				expect(featureCoords).to.equal(true);
			});
		});
		describe('properties', function() {
			it('each feature has a property object', function() {
				const tester = DATA_HELPERS.getGeojson(STUB_DATA.response.checkins.items);
				let featureProps = true;
				tester['features'].forEach((feature) => {
					if (!feature.properties) {
						featureProps = feature;
					}
				});
				expect(featureProps).to.equal(true);
			});
		});
	});	
});
