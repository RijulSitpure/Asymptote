class Solution:
    def applySubstitutions(self, replacements: list[list[str]], text: str) -> str:
        rep_map = {k: v for k, v in replacements}
        memo = {}

        def resolve(s: str) -> str:
            res = []
            i = 0
            n = len(s)
            while i < n:
                if s[i] == '%':
                    j = s.find('%', i + 1)
                    key = s[i + 1:j]
                    if key not in memo:
                        memo[key] = resolve(rep_map[key])
                    res.append(memo[key])
                    i = j + 1
                else:
                    res.append(s[i])
                    i += 1
            return "".join(res)

        return resolve(text)

def test_apply_substitutions():
    sol = Solution()
    assert sol.applySubstitutions([["A", "apple"], ["B", "banana"]], "I like %A% and %B%") == "I like apple and banana"
    assert sol.applySubstitutions([["A", "%B%"], ["B", "cat"]], "%A%") == "cat"

if __name__ == '__main__':
    test_apply_substitutions()
    print('All tests passed.')
