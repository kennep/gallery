require('should');
directory = require('../server/directory');

describe('directory', function() {
	describe('resolvePath', function() {
			beforeEach(function() {
				directory._OLDROOT = directory.ROOT;
				directory.ROOT = "/Test/Root";
			});
			
			afterEach(function() {
				directory.ROOT = directory._OLDROOT;
				delete directory._OLDROOT;
			});
		
			it('should resolve the path relative to the root path', function() {
				directory.resolvePath("test/test.png").should.equal("/Test/Root/test/test.png");
			})

			it('should resolve the path relative to the root path that ends with a slash', function() {
				directory.ROOT = "/Test/SlashRoot/"
				directory.resolvePath("test/test.png").should.equal("/Test/SlashRoot/test/test.png");
			})

			it('should resolve paths containing .. from the root path correctly', function() {
				directory.resolvePath("../test/test.png").should.equal("/Test/Root/test/test.png");
			})

			it('should resolve paths containing .. from a descentant path correctly', function() {
				directory.resolvePath("test/testing/../test.png").should.equal("/Test/Root/test/test.png");
			})

			it('should resolve paths starting with / correctly', function() {
				directory.resolvePath("/test.png").should.equal("/Test/Root/test.png");
			})

	})
	
})