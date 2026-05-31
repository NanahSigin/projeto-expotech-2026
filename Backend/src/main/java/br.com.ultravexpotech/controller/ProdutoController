package br.com.ultravexpotech.controller;

import br.com.ultravexpotech.model.Produto;
import br.com.ultravexpotech.repository.AdministradorRepository;
import br.com.ultravexpotech.repository.ProdutoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoRepository repository;
    private final AdministradorRepository adminRepository;

    public ProdutoController(ProdutoRepository repository, AdministradorRepository adminRepository) {
        this.repository = repository;
        this.adminRepository = adminRepository;
    }

    // ----- Leitura (publica) ---------------------------------------------
    @GetMapping("/produtos")
    public List<Produto> listar() {
        return repository.findAll();
    }

    @GetMapping("/produto/{id}")
    public Produto buscarPorId(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/categoria/{categoria}")
    public List<Produto> buscarCategoria(@PathVariable String categoria) {
        return repository.findByCategoria(categoria);
    }

    @GetMapping("/pesquisa/{nome}")
    public List<Produto> pesquisar(@PathVariable String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    // ----- Escrita (apenas admin) ----------------------------------------
    @PostMapping("/produtos")
    public ResponseEntity<?> criar(@RequestBody Produto produto,
                                   @RequestHeader(value = "X-Admin-Id", required = false) Integer adminId) {
        if (!isAdmin(adminId)) return ResponseEntity.status(401).body("Apenas administradores podem cadastrar produtos.");
        produto.setId(null);
        return ResponseEntity.ok(repository.save(produto));
    }

    @PutMapping("/produtos/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id,
                                       @RequestBody Produto produto,
                                       @RequestHeader(value = "X-Admin-Id", required = false) Integer adminId) {
        if (!isAdmin(adminId)) return ResponseEntity.status(401).body("Apenas administradores podem editar produtos.");
        return repository.findById(id).map(p -> {
            p.setNome(produto.getNome());
            p.setPreco(produto.getPreco());
            p.setCategoria(produto.getCategoria());
            p.setDestaque(produto.getDestaque());
            p.setDescricao(produto.getDescricao());
            p.setImagemUrl(produto.getImagemUrl());
            return ResponseEntity.ok(repository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/produtos/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id,
                                     @RequestHeader(value = "X-Admin-Id", required = false) Integer adminId) {
        if (!isAdmin(adminId)) return ResponseEntity.status(401).body("Apenas administradores podem remover produtos.");
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    private boolean isAdmin(Integer adminId) {
        return adminId != null && adminRepository.existsById(adminId);
    }
}
