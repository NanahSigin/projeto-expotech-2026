package br.com.ultravexpotech.service;

import br.com.ultravexpotech.model.Pagamento;
import br.com.ultravexpotech.model.Usuario;
import org.springframework.stereotype.Service;

@Service
public class PagamentoService {

    public boolean usuarioTemCartaoValido(String nomeUsuario) {
        return false;
        // Retornamos falso para testar o aviso no front

    }

    public Pagamento processarPagamento(Long carrinhoId, String metodo) {
        Pagamento pagamento = new Pagamento();
        pagamento.setMetodoPagamento(metodo);
        pagamento.setStatus("APROVADO");

        // aqui você usaria o repository para salvar
        // return pagamentoRepository.save(pagamento);

        return pagamento;
    }
}
