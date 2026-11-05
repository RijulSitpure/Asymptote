from collections import defaultdict

class Solution:
    def minOperations(self, source: str, target: str) -> int:
        if len(source) != len(target):
            return -1
        
        count = defaultdict(int)
        total_mismatches = 0
        for s, t in zip(source, target):
            if s != t:
                count[(s, t)] += 1
                total_mismatches += 1
                
        saved = 0
        chars = list(set([u for u, v in count.keys()] + [v for u, v in count.keys()]))
        
        # 2-cycles
        for i in range(len(chars)):
            for j in range(i + 1, len(chars)):
                u, v = chars[i], chars[j]
                k = min(count[(u, v)], count[(v, u)])
                saved += k
                count[(u, v)] -= k
                count[(v, u)] -= k
                
        # 3-cycles
        for i in range(len(chars)):
            for j in range(len(chars)):
                if i == j: continue
                for m in range(len(chars)):
                    if m == i or m == j: continue
                    u, v, w = chars[i], chars[j], chars[m]
                    k = min(count[(u, v)], count[(v, w)], count[(w, u)])
                    if k > 0:
                        saved += k
                        count[(u, v)] -= k
                        count[(v, w)] -= k
                        count[(w, u)] -= k
                        
        return total_mismatches - saved

def run_tests():
    s = Solution()
    res1 = s.minOperations("ab", "ba")
    assert res1 == 1, f"Expected 1, got {res1}" # 1 swap
    res2 = s.minOperations("abc", "bca")
    assert res2 == 2, f"Expected 2, got {res2}"
    print("3579 minimum-steps-to-convert-string-with-operations PASSED")

if __name__ == "__main__":
    run_tests()
