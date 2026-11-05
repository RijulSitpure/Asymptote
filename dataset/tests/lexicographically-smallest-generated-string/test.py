class Solution:
    def generateString(self, str1: str, str2: str) -> str:
        n, m = len(str1), len(str2)
        sz = n + m - 1
        ans = [None] * sz
        fixed = [False] * sz

        for i in range(n):
            if str1[i] == 'T':
                for j in range(m):
                    pos = i + j
                    if ans[pos] is not None and ans[pos] != str2[j]:
                        return ""
                    ans[pos] = str2[j]
                    fixed[pos] = True

        for i in range(sz):
            if ans[i] is None:
                ans[i] = 'a'

        for i in range(n):
            if str1[i] == 'F':
                match = True
                for j in range(m):
                    if ans[i + j] != str2[j]:
                        match = False
                        break
                if match:
                    modifiable_pos = -1
                    for j in range(m - 1, -1, -1):
                        pos = i + j
                        if not fixed[pos]:
                            modifiable_pos = pos
                            break
                    if modifiable_pos == -1:
                        return ""
                    ans[modifiable_pos] = 'b'
                    fixed[modifiable_pos] = True

        for i in range(n):
            match = (''.join(ans[i:i + m]) == str2)
            if str1[i] == 'T' and not match:
                return ""
            if str1[i] == 'F' and match:
                return ""

        return "".join(ans)

def test_lexicographically_smallest_generated_string():
    sol = Solution()
    assert sol.generateString("TFTF", "ab") == "ababa"
    assert sol.generateString("TFTF", "abc") == ""
    assert sol.generateString("F", "d") == "a"

if __name__ == '__main__':
    test_lexicographically_smallest_generated_string()
    print('All tests passed.')
