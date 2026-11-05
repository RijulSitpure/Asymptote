from typing import List

class Solution:
    def processString(self, s: str, operations: List[List[str]]) -> str:
        arr = list(s)
        for op in operations:
            cmd = op[0]
            if cmd == "REVERSE":
                l, r = int(op[1]), int(op[2])
                arr[l:r + 1] = reversed(arr[l:r + 1])
            elif cmd == "REPLACE":
                idx, ch = int(op[1]), op[2]
                arr[idx] = ch
            elif cmd == "SWAP":
                i, j = int(op[1]), int(op[2])
                arr[i], arr[j] = arr[j], arr[i]
        return "".join(arr)

def run_tests():
    s = Solution()
    res1 = s.processString("abcde", [["REVERSE", "1", "3"], ["SWAP", "0", "4"]])
    # "abcde" -> reverse 1..3: "adcbe" -> swap 0, 4: "edcba"
    assert res1 == "edcba", f"Expected edcba, got {res1}"
    res2 = s.processString("xyz", [["REPLACE", "1", "a"]])
    assert res2 == "xaz", f"Expected xaz, got {res2}"
    print("3612 process-string-with-special-operations-i PASSED")

if __name__ == "__main__":
    run_tests()
