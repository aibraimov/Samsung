module ApplicationHelper

  # Returns the full title on a per-page basis.
  def full_title(page_title)
    base_title = "Intrade.me"
    if page_title.empty?
      base_title
    else
      "#{base_title} | #{page_title}"
    end
  end

  def str_simpl str
  	result = str.gsub( /\s+/, ' ')
  	result.gsub!( /^\s/, '')
  	result.gsub!(/\s$/, '')
  	return '' unless result.size > 0
  	return result
  end
end
