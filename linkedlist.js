class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
} // fim classe Node
//------------------------------------------------------------  
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  //------------------------------------------------------------  
  addLast(data) {
    const newNode = new Node(data);
    if (newNode === null)
      return false;

    if (this.head === null)
      // Se a lista estiver vazia, o novo nó se torna a cabeça e a cauda
      this.head = newNode;
    else {
      // Caso contrário, adiciona o novo nó à cauda e atualiza a cauda
      newNode.prev = this.tail;
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length++;
    return true;
  }
  //------------------------------------------------------------  
  addFirst(data) {
    const newNode = new Node(data);
    if (newNode === null)
      return false;
    if (this.tail === null)
      // Se a lista estiver vazia, o novo nó se torna a cabeça e a cauda
      this.tail = newNode;
    else {
      // Caso contrário, adiciona o novo nó à cabeça e atualiza a cabeça
      newNode.next = this.head;
      this.head.prev = newNode;
    }
    this.head = newNode;
    this.length++;
    return true;
  }
  addAtIndex(index, data) {
    if (index <= 0) {
      // Adicionar no início da lista
      return this.addFirst(data);
    }

    if (index >= this.length) {
      // Adicionar no final da lista
      return this.addLast(data);
    }

    const newNode = new Node(data);
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentIndex < index) {
      currentNode = currentNode.next;
      currentIndex++;
    }

    // Inserir o novo nó antes ou depois do nó na posição index
    newNode.prev = currentNode.prev;
    newNode.next = currentNode;
    currentNode.prev.next = newNode;
    currentNode.prev = newNode;

    this.length++;
    return true;
  }
  //------------------------------------------------------------  
  deleteFirst() {
    const removedData = this.head.data; // Salva o valor do elemento removido
    this.head = this.head.next;
    if (this.head !== null) {
      this.head.prev = null;
    }
    else
      this.tail = null;
    this.length--;
    return removedData; // Retorna o valor do elemento removido
  }
  //------------------------------------------------------------
  isEmpty() {
    return this.head === null;
  }
  //------------------------------------------------------------
  forEach(callback) {
    let currentNode = this.head;

    while (currentNode !== null) {
      callback(currentNode.data);
      currentNode = currentNode.next;
    }
  }
  first() {
    if (this.head === null) {
      return null;
    }

    return this.head.data;
  }

  last() {
    if (this.tail === null) {
      return null;
    }

    return this.tail.data;
  }
  getElementByIndex(index) {
    if (index < 0 || index >= this.length) {
      return null; // índice inválido
    }

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentIndex < index) {
      currentNode = currentNode.next;
      currentIndex++;
    }

    return currentNode.data;
  }
  getOldestTask() {
    let oldestTask = null;
    let currentNode = this.head;
    
    while (currentNode !== null) {
      if (oldestTask === null || currentNode.data.date < oldestTask.date) {
        oldestTask = currentNode.data;
      }
      currentNode = currentNode.next;
    }
    
    return oldestTask;
  }
  deleteAtIndex(index) {
    if (index < 0 || index >= this.length) {
      return null; // índice inválido
    }

    let currentNode = this.head;

    // Se for o primeiro elemento da lista
    if (index === 0) {
      this.head = currentNode.next;

      // Se a lista tiver apenas um elemento, atualize a cauda também
      if (this.length === 1) {
        this.tail = null;
      } else {
        this.head.prev = null;
      }

    // Se for o último elemento da lista
    } else if (index === this.length - 1) {
      currentNode = this.tail;
      this.tail = currentNode.prev;
      this.tail.next = null;

    // Se for um elemento no meio da lista
    } else {
      for (let i = 0; i < index; i++) {
        currentNode = currentNode.next;
      }

      currentNode.prev.next = currentNode.next;
      currentNode.next.prev = currentNode.prev;
    }

    this.length--;
    return currentNode.data;
}
}// fim classe LinkedList

