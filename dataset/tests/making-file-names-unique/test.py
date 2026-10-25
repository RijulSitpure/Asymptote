class Solution:
    def getFolderNames(self, names: list[str]) -> list[str]:
        used = {}
        ans = []
        for name in names:
            if name not in used:
                used[name] = 1
                ans.append(name)
            else:
                k = used[name]
                candidate = f"{name}({k})"
                while candidate in used:
                    k += 1
                    candidate = f"{name}({k})"
                used[name] = k + 1
                used[candidate] = 1
                ans.append(candidate)
        return ans

def test():
    sol = Solution()
    assert sol.getFolderNames(["pes","pes","pes"]) == ["pes","pes(1)","pes(2)"], "test 1 failed"
    assert sol.getFolderNames(["gta","gta(1)","gta","avalon"]) == ["gta","gta(1)","gta(2)","avalon"], "test 2 failed"
    assert sol.getFolderNames(["onepiece","onepiece(1)","onepiece(2)","onepiece(3)","onepiece"]) == ["onepiece","onepiece(1)","onepiece(2)","onepiece(3)","onepiece(4)"], "test 3 failed"
    print("✓ making-file-names-unique passed")

if __name__ == "__main__":
    test()
