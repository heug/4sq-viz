import { expect } from 'chai';
import DATA_HELPERS from '../../data-helpers/app';
import STUB_DATA from '../../stubs/checkInTester';

describe('Checkin Helper Functions', function() {
	describe('Venues', function() {
		it('aggregates categories with counts', function() {
			const tester = DATA_HELPERS.getCategoryCount(STUB_DATA.response.checkins.items);
			expect(tester['Portuguese Restaurant'].count).to.equal(2);
		});
	});	
});
