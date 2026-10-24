import sys
from typing import List

class Solution:
    def findDuplicate(self, paths: List[str]) -> List[List[str]]:
        from collections import defaultdict
        content_map = defaultdict(list)
        for path_entry in paths:
            parts = path_entry.split()
            dir_path = parts[0]
            for f in parts[1:]:
                name, content = f.split("(")
                content = content[:-1]
                content_map[content].append(f"{dir_path}/{name}")
        return [group for group in content_map.values() if len(group) > 1]

def test():
    sol = Solution()
    paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]
    res = sol.findDuplicate(paths)
    sorted_res = sorted([sorted(g) for g in res])
    expected = sorted([sorted(g) for g in [["root/a/1.txt", "root/c/3.txt"], ["root/a/2.txt", "root/c/d/4.txt", "root/4.txt"]]])
    assert sorted_res == expected, "test 1 failed"
    print("✓ find-duplicate-file-in-system passed")

if __name__ == "__main__":
    test()
