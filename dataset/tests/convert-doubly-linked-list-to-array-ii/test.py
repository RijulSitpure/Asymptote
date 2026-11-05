from solution import Solution, Node

def run_tests():
    s = Solution()
    n1 = Node(1)
    n2 = Node(2)
    n3 = Node(3)
    n1.next = n2
    n2.prev = n1
    n2.next = n3
    n3.prev = n2
    
    # Test starting from middle node
    assert s.toArray(n2) == [1, 2, 3], "Starting from middle failed"
    # Test starting from tail node
    assert s.toArray(n3) == [1, 2, 3], "Starting from tail failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
