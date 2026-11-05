from typing import List

class Solution:
    def processString(self, s: str, queries: List[List[int]]) -> str:
        arr = list(s)
        # queries: [type, l, r] where type 1: reverse l..r, type 2: shift right by 1 in l..r
        for q in queries:
            t, l, r = q[0], q[1], q[2]
            if t == 1:
                arr[l:r + 1] = reversed(arr[l:r + 1])
            elif t == 2:
                # Cyclic shift right by 1
                last = arr[r]
                for idx in range(r, l, -1):
                    arr[idx] = arr[idx - 1]
                arr[l] = last
        return "".join(arr)

def run_tests():
    s = Solution()
    res1 = s.processString("abcde", [[1, 1, 3], [2, 0, 4]])
    # "abcde" -> reverse 1..3: "adcbe" -> shift right: "eadcb"
    assert res1 == "eadcb", f"Expected eadcb, got {res1}"
    res2 = s.processString("abc", [[2, 0, 2]])
    assert res2 == "cab", f"Expected cab, got {res2}"
    print("3614 process-string-with-special-operations-ii PASSED")

if __name__ == "__main__":
    run_tests()
