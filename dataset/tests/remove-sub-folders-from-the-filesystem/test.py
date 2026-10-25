class Solution:
    def removeSubfolders(self, folder: list[str]) -> list[str]:
        folder.sort()
        res = []
        for f in folder:
            if not res or not f.startswith(res[-1] + '/'):
                res.append(f)
        return res

def test():
    sol = Solution()
    assert sol.removeSubfolders(["/a","/a/b","/c/d","/c/d/e","/c/f"]) == ["/a","/c/d","/c/f"], "test 1 failed"
    assert sol.removeSubfolders(["/a","/a/b/c","/a/b/d"]) == ["/a"], "test 2 failed"
    assert sol.removeSubfolders(["/a/b/c","/a/b/ca","/a/b/d"]) == ["/a/b/c","/a/b/ca","/a/b/d"], "test 3 failed"
    print("✓ remove-sub-folders-from-the-filesystem passed")

if __name__ == "__main__":
    test()
