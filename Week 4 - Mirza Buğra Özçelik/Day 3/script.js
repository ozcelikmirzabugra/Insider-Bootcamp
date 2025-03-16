class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.discountApplied = false;
  }

  addItem(productId, quantity = 1) {
    try {
      const product = products.find(p => p.id === productId);

      if (!product) {
        throw new Error('Ürün bulunamadı!');
      }

      if (product.stock < quantity) { // Düzeltildi
        throw new Error('Yetersiz stok!');
      }

      product.stock -= quantity; // Stok güncellendi

      const existingItem = this.items.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          productId,
          name: product.name,
          price: product.price,
          quantity
        });
      }

      this.calculateTotal();
      this.updateUI();
      document.dispatchEvent(new Event('stockUpdate')); // Ürün listesini güncellemek için eklendi

    } catch (error) {
      console.error('Ürün ekleme hatası:', error);
      this.showError(error.message);
    }
  }

  removeItem(productId) {
    try {
      const itemIndex = this.items.findIndex(item => item.productId === productId);

      if (itemIndex === -1) {
        throw new Error('Ürün sepette bulunamadı!');
      }

      const item = this.items[itemIndex];
      const product = products.find(p => p.id === productId);

      if (product) {
        product.stock += item.quantity; // Düzeltildi
      }

      this.items.splice(itemIndex, 1);
      this.calculateTotal();
      this.updateUI();
      document.dispatchEvent(new Event('stockUpdate')); // Ürün listesini güncellemek için eklendi

    } catch (error) {
      console.error('Ürün silme hatası:', error);
      this.showError(error.message);
    }
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity); // Düzeltildi
    }, 0);

    if (this.discountApplied && this.total > 0) {
      this.total *= 0.9;
    }
  }

  applyDiscount(code) {
    if (code === 'INDIRIM10' && !this.discountApplied) {
      this.discountApplied = true;
      this.calculateTotal();
      this.updateUI();
      this.showMessage('İndirim uygulandı!');
    } else {
      this.showError('Geçersiz indirim kodu!');
    }
  }

  updateUI() {
    const cartElement = document.getElementById('cart');
    const totalElement = document.getElementById('total');

    if (cartElement && totalElement) {
      cartElement.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>${item.quantity} adet</span>
                    <span>${item.price * item.quantity} TL</span> <!-- Düzeltildi -->
                    <button onclick="cart.removeItem(${item.productId})">Sil</button>
                </div>
            `).join('');

      totalElement.textContent = `Toplam: ${this.total.toFixed(2)} TL`;
    }
  }

  showError(message) {
    const errorElement = document.getElementById('error');
    if (errorElement) {
      errorElement.textContent = message; // Önceki mesajlar temizlendi
    }
  }

  showMessage(message) {
    const messageElement = document.getElementById('message');
    if (messageElement) {
      messageElement.textContent = message;
      setTimeout(() => {
        messageElement.textContent = '';
      }, 3000);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cart = new ShoppingCart();
  window.app = new App();
});
