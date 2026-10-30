from collections import defaultdict

class FolderNode:
    def __init__(self, name=""):
        self.name = name
        self.children = {}
        self.serial = ""
        self.deleted = False

class Solution:
    def deleteDuplicateFolder(self, paths: list[list[str]]) -> list[list[str]]:
        root = FolderNode()
        for p in paths:
            curr = root
            for folder in p:
                if folder not in curr.children:
                    curr.children[folder] = FolderNode(folder)
                curr = curr.children[folder]
                
        serial_counts = defaultdict(int)
        
        def serialize(node):
            if not node.children:
                return ""
            child_serials = []
            for name in sorted(node.children):
                sub = serialize(node.children[name])
                child_serials.append(f"{name}({sub})")
            node.serial = "".join(child_serials)
            serial_counts[node.serial] += 1
            return node.serial
            
        serialize(root)
        
        def mark_deleted(node):
            if node.serial and serial_counts[node.serial] > 1:
                node.deleted = True
                return
            for child in node.children.values():
                mark_deleted(child)
                
        mark_deleted(root)
        
        ans = []
        def collect(node, curr_path):
            for name in sorted(node.children):
                child = node.children[name]
                if not child.deleted:
                    ans.append(curr_path + [name])
                    collect(child, curr_path + [name])
                    
        collect(root, [])
        return ans

def test_delete_duplicate_folder():
    sol = Solution()
    res1 = sol.deleteDuplicateFolder([["a"],["c"],["d"],["a","b"],["c","b"],["d","a"]])
    assert res1 == [["d"],["d","a"]]

