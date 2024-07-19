const BACKEND_API_URL = 'https://dummyjson.com/products';


export async function fetchProducts(searchQuery = '') {
  try {
    const response = await fetch(`${BACKEND_API_URL}/search?q=${searchQuery}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error(error.message || 'Failed to fetch products');
  }
}

export async function fetchProductById(id) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch product');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error(error.message || 'Failed to fetch product');
  }
}

export async function createProduct(product) {
  try {
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const text = await response.text(); 
      throw new Error(`Failed to create product. Server returned error`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error(error.message || 'Failed to create product');
  }
}


export async function updateProduct(id, product) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Update error data:', errorData);
      throw new Error(errorData.message || 'Failed to update product');
    }

    const data = await response.json();
    console.log('Updated product data:', data);
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error(error.message || 'Failed to update product');
  }
}


export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete product');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error(error.message || 'Failed to delete product');
  }
}
