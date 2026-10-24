import sys

class Solution:
    def lengthLongestPath(self, input: str) -> int:
        max_len = 0
        path_len = {0: 0}
        for line in input.split("\n"):
            name = line.lstrip("\t")
            depth = len(line) - len(name)
            if "." in name:
                max_len = max(max_len, path_len[depth] + len(name))
            else:
                path_len[depth + 1] = path_len[depth] + len(name) + 1
        return max_len

def test():
    sol = Solution()
    s1 = "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"
    assert sol.lengthLongestPath(s1) == 20, "test 1 failed"
    s2 = "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext"
    assert sol.lengthLongestPath(s2) == 32, "test 2 failed"
    s3 = "a"
    assert sol.lengthLongestPath(s3) == 0, "test 3 failed"
    print("✓ longest-absolute-file-path passed")

if __name__ == "__main__":
    test()
