  describe('your regexes', function(){

    // CHALLENGE: match an ip address
    it('matches ip addresses', function(){

      var regex = /^(\d{1,3}\.){3}\d{1,3}$/;
      var tests = [
        ['a.b.c.d', false],
        ['10.0.0.224', true],
        ['192.168.0.1', true],
        ['192.168.0', false],
        // ['999.999.999.999', false] // uncomment if you're feeling self-destructive
      ];

      tests.forEach(function(testData){
        var string = testData[0], shouldMatch = testData[1];
        if(shouldMatch){
          expect(string).toMatch(regex);
        } else {
          expect(string).not.toMatch(regex);
        }
      })
    })

    // CHALLENGE: enforce irritating username rules
    // - must start with a letter.
    // - must be between 4 and 20 characters long.
    // - can only contain letters, spaces, underscores and hyphens.
    it('filters usernames', function(){

      var regex = /^[a-zA-Z][a-zA-Z-_ ]{3,19}$/;

      var tests = [
        ['seunglim', true],
        ['007seunglim', false],
        ['_seunglim', false],
        ['bro', false],
        ['bros', true],
        ['all killer', true],
        ['all-killer', true],
        ['all_killer', true],
        ['no%filler', false],
        ['a_____--______------', true],
        ['a123', false],
        ['abcdefghijklmnopqrstuvwxyz', false],
        ['abcdefghijklmnopqrst', true]
      ];

      tests.forEach(function(testData){
        var string = testData[0], shouldMatch = testData[1];
        if(shouldMatch){
          expect(string).toMatch(regex);
        } else {
          expect(string).not.toMatch(regex);
        }
      })
    })

    // CHALLENGE: extract text contents of a string with an html tag in it
    // - use lazy matchers.
    // - use match groups to get your result.
    // - don't use non-regex, non-match group techniques here.
    it('extracts text', function(){

      var extractText = function(str){
        var matches = str.match(/^(.*)<.+?>(.*)<.+?>(.*)$/);
        matches.shift();
        return matches.join('');
      };

      var tests = [
        ['<p>seunglim</p>', 'seunglim'],
        ['<p style="asdf">talkin bout seunglim</p>', 'talkin bout seunglim'],
        ['seunglim is <font style="color:red">rad</font> yo', 'seunglim is rad yo']
      ];

      tests.forEach(function(testData){
        expect(extractText(testData[0])).toEqual(testData[1]);
      })
    })

    // CHALLENGE: match a decimal number.
    it('matches decimal numbers', function(){

      var regex = /^-?\d*\.?\d+$/;

      var tests = [
        ['-0.0', true],
        ['.', false],
        ['1.', false],
        ['1', true],
        ['.023', true],
        ['12.023', true],
        ['a12.023', false],
        ['12.023-', false],
      ];

      tests.forEach(function(testData){
        var string = testData[0], shouldMatch = testData[1];
        if(shouldMatch){
          expect(string).toMatch(regex);
        } else {
          expect(string).not.toMatch(regex);
        }
      })
    })

    // CHALLENGE: given a string and a word, test if the word occurs two
    // times in quick succession (within 3 words) within the string.  You
    // should use regexes, not because they're the best tool -- but because
    // you love pain.

    it('detects nearby words', function(){

      var containsNearbyWords = function(sentence, wordToMatch){
        var words = sentence.split(' ');
        for(var i = 0, len = words.length; i < len; i++){
          if(words[i] === wordToMatch){
            if(wordToMatch === words[i + 1] ||
               wordToMatch === words[i + 2] ||
               wordToMatch === words[i + 3] ){
              return true;
            }
          }
        }
        return false;
      };

      var tests = [
        ['we like regexes because they\'re regexes', 'regexes', true],
        ['regexes are lovely', 'potato', false],
        ['we like a regex because of regexes', 'regex', false],
        ['regexes, we like, because they\'re regexes', 'regexes', false],
      ];

      tests.forEach(function(testData){
        var sentence = testData[0],
          wordToMatch = testData[1],
          expectedResult = testData[2]
          result = containsNearbyWords(sentence, wordToMatch);
        expect(result).toEqual(expectedResult);
      })
    })
  });
