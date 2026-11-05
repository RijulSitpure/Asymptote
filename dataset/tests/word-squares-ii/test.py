from collections import defaultdict

class Solution:
    def wordSquares(self, words: list[str]) -> list[list[str]]:
        n = len(words[0])
        pref_map = defaultdict(list)
        for w in words:
            for i in range(n + 1):
                pref_map[w[:i]].append(w)
        
        res = []
        def backtrack(step: int, current_square: list[str]):
            if step == n:
                res.append(list(current_square))
                return
            
            pref = "".join(current_square[r][step] for r in range(step))
            for candidate in pref_map.get(pref, []):
                current_square.append(candidate)
                backtrack(step + 1, current_square)
                current_square.pop()
        
        backtrack(0, [])
        return res

def run_tests():
    sol = Solution()
    ws = sol.wordSquares(["ball", "area", "lead", "lady"])
    assert ["ball", "area", "lead", "lady"] in ws
    print("All tests passed for 3799.")

if __name__ == "__main__":
    run_tests()
